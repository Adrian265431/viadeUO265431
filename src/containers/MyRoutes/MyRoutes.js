import React from "react";
import { Loader } from "@util-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header, RouteWrapper, MyRouteContainer, FormRenderContainer } from "./myroutes.style";
import InfoRoute from "./InfoRoute";
import i18n from "i18n";
import * as viadeManager from "../../utils/viadeManagerSolid";

type Props = { webId: String };

class MyRoute extends React.Component {
	constructor({ webId }: Props) {
		super();
		this.state = {
			data: null,
			original: null,
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	componentDidMount() {
		const { webId } = this.props;
		this._asyncRequest = viadeManager.readRoutesFromPod(webId).then((data) => {
			this._asyncRequest = null;
			this.setState({
				data: data,
				original: data
			});
		});
	}

	//Busqueda, si hay algo escrito en ella, hace el filtrado, sino coge todas las rutas
	handleChange(e) {
		var currentList = [];
		var newList = [];
		if (e.target.value !== "EMPTY") {
			currentList = this.state.original;
			newList = currentList.filter((item) => {
					const lc = item.categoria.toLowerCase();
					const filter = e.target.value.toLowerCase();
					return lc.includes(filter);
			});
			this.setState({
				data: newList
			});
		} else {
			newList = this.state.original;
		}
	}

	render(): React.ReactNode {
		if (this.state.data !== null && this.state.data !== "EMPTY") {
			return (
				<RouteWrapper data-testid="route-component">
					<MyRouteContainer data-testid="myroute-container">
						<FormRenderContainer>
							<Header data-testid="myroute-header">
								<h1>{i18n.t("routList.tittle")}</h1>
								<input
									type="text"
									className="input"
									onChange={this.handleChange}
									placeholder="Busqueda por categoria..."
								/>
								<FontAwesomeIcon icon="search" className="search-icon" id="searchIcon" />
							</Header>
							{this.state.data.map((ruta, index) => {
								if (ruta.points.length > 0) {
									return (
										<InfoRoute
											key={index}
											name={ruta.name}
											author={ruta.author}
											description={ruta.description}
											categoria={ruta.categoria}
											points={ruta.points}
											center={ruta.calculateCenter()}
											ttl={ruta.content}
											error={false}
											errorMore={false}
											webID={this.props}
											ruta={ruta}
										/>
									);
								}else{
									return 0;
								}
							})}
						</FormRenderContainer>
					</MyRouteContainer>
				</RouteWrapper>
			);
		}
		if (this.state.data !== null) {
			if (this.state.data === "EMPTY" || this.state.data.length <= 0) {
				return (
					<RouteWrapper data-testid="route-component">
						<MyRouteContainer data-testid="myroute-container">
							<FormRenderContainer id="empty">
								<Header data-testid="myroute-header">
									<h1 id="h1-empty">{i18n.t("routList.tittle")}</h1>{" "}
								</Header>
								<h5 align="center">
									{i18n.t("routList.noRoutes")}
								</h5>
							</FormRenderContainer>
						</MyRouteContainer>
					</RouteWrapper>
				);
			}
		} else {
			return <Loader absolute />;
		}
	}
}

export default MyRoute;
