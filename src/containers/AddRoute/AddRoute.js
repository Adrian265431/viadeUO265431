import React from "react";
import Map from "./Map";
import { errorToaster, successToaster } from "@utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Section , H3, Div, TextArea, DivMax} from "./AddRoute.style";
import { Route, Point } from "../../domain";
import i18n from "i18n";
import * as viadeManager from "../../utils/viadeManagerSolid";

type Props = {
	webId: String
};

class AddRoute extends React.Component {
	constructor({ webId }: Props) {
		super();
		this.webID = webId;
		this.handleSave = this.handleSave.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.name = React.createRef();
		this.description = React.createRef();
		this.categoria = React.createRef();
		this.state = {
			markers: null
		};
	}

	state = { markers: {} };

	callBackFunction = (childData) => {
		this.setState({ markers: childData });
	};

	componentWillUnmount() {}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.handleSave(event);
	}

	async handleSave(event) {
		if (this.name.current.value.length === 0) {
			errorToaster(i18n.t("addRoute.errorName"), "ERROR");
		} else if (this.description.current.value.length === 0) {
			errorToaster(i18n.t("addRoute.errorDescription"), "ERROR");
		} else if (this.categoria.current.value.length === 0) {
			errorToaster(i18n.t("addRoute.errorCategory"), "ERROR");
		} else if (this.state.markers === null || this.state.markers.length < 0) {
			errorToaster(i18n.t("addRoute.errorPoints"), "ERROR");
		} else if (this.state.markers.length <2) {
			errorToaster(i18n.t("addRoute.errorOnePoint"), "ERROR");
		} else {
			const points = [];
			for (let i = 0; i < this.state.markers.length; i++) {
				points.push(
					new Point(
						this.state.markers[parseInt(i)].position.lat,
						this.state.markers[parseInt(i)].position.lng,
						this.state.markers[parseInt(i)].position.alt
					)
				);
			}

			let author = this.webID.replace("https://", "");
			author = author.replace(".solid.community/profile/card#me", "");
			author = author.replace(".inrupt.net/profile/card#me", "");

			let route = new Route(this.name.current.value, author, this.description.current.value, points, this.categoria.current.value);
			await viadeManager.addRoute(route, this.webID);
			successToaster(i18n.t("addRoute.successRoute"), i18n.t("addRoute.success"));
		}
		event.persist();
	}

	render(): React.ReactNode {
		return (
			<Section data-testid="route-component">
				<div data-testid="route-header">
					<H3>{i18n.t("addRoute.title")}</H3>
						<Div>
							<label>
								{i18n.t("addRoute.name")}{" "}
								<input type="text" id="route_name" name="route_name" ref={this.name} />
							</label>
						</Div>
						<Div>
							<label>
								{" "}
								{i18n.t("addRoute.description")}{" "}
								<TextArea
									type="text"
									id="description"
									name="description"
									rows="10"
									ref={this.description}
								/>{" "}
							</label>
						</Div>
						<Div>
							<label>
								{i18n.t("addRoute.category")}{" "}
								<input type="text" id="route_categoria" name="route_categoria" ref={this.categoria} />
							</label>
						</Div>
						<DivMax>
						<button id="save_route" form="routef" type="submit" onClick={(e) => this.handleSubmit(e)}>
							<FontAwesomeIcon icon="save" className="save-icon" title={i18n.t("addRoute.btnSave")} />
							{"	" + i18n.t("addRoute.btnSave")}
						</button>
						</DivMax>
				</div>
				<div>
					<Map parentCallBack={this.callBackFunction} />
				</div>
			</Section>
				
		);
	}
}

export default AddRoute;
