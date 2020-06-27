import React from "react";
import { Loader } from "@util-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../../components/Pagination";

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
			currentData: [],
			currentPage: null,
			pageLimit: 2,
			totalPages: null
		};
		this.handleChange = this.handleChange.bind(this);
	}
	onPageChanged = (data) => {
		if (this.state.data !== null && this.state.data !== "EMPTY") {
			const allRutas = this.state.data;
			const { currentPage, totalPages, pageLimit } = data;
			const offset = (currentPage - 1) * pageLimit;
			const currentData = allRutas.slice(offset, offset + pageLimit);
			this.setState({ currentPage, currentData, totalPages });
		}
	};
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

	//Busqueda
	handleChange(e) {
		var currentList = [];
		var newList = [];
		if (e.target.value !== "") {
			currentList = this.state.original;
		
			newList = currentList.filter((item) => {
					const lc = item.categoria.toLowerCase();
					const filter = e.target.value.toLowerCase();
					return lc.includes(filter);
			});
		} else {
			newList = this.state.original;
			this.setState({
				totalPages: newList.length
			});
			this.onPageChanged(this.state);
		}
		this.setState({
				data: newList,
				totalPages: this.state.data.length,
				currentPage:1
			});
		this.onPageChanged(this.state);
	}

	render(): React.ReactNode {
		if (this.state.data !== null && this.state.data !== "EMPTY") {
			const { data } = this.state;
			const totalRutas = data.length;
			return (
				<RouteWrapper data-testid="route-component">
					<MyRouteContainer data-testid="myroute-container">
						<FormRenderContainer>
							<Header data-testid="myroute-header">
								<h1>{i18n.t("myRoutes.title")}</h1>
								<input
									type="text"
									className="input"
									onChange={this.handleChange}
									placeholder="Busqueda por categoria..."
								/>
								<FontAwesomeIcon icon="search" className="search-icon" id="searchIcon" />
								
								<div className="d-flex flex-row py-4 align-items-center" id="pagination">
									<Pagination
										totalRecords={totalRutas-1}
										pageLimit={1}
										pageNeighbours={2}
										onPageChanged={this.onPageChanged}
									/>
								</div>
							</Header>
							{this.state.currentData.map((ruta, index) => {
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
