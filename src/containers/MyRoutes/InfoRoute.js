import React from "react";
import { RouteCard } from "./myroutes.style";
import { FormRenderContainer } from "../MyRoutes/infoRoute.style";
import RouteMap from "./RouteMap";
import i18n from "i18n";

const InfoRoute = (props) => {
	const { name, author, description, categoria, points, center, error, errorMore} = props;
	
	if (!error) {
		return (
			<RouteCard className="card" id="card">
			
				<div id={name}>
					<h2>{name}</h2>
					<h3> {i18n.t("myRoutes.createdBy")} </h3>
					<p>{author}</p>
					<h3> {i18n.t("myRoutes.description")}</h3>
					<p>{description}</p>
					<h3> {i18n.t("myRoutes.categoria")}</h3>
					<p>{categoria}</p>
					<br />
					<FormRenderContainer id="mapa">
						<RouteMap markers={points} center={center} />
					</FormRenderContainer>
					<br />
				</div>
			</RouteCard>
		);
	} else {
		return (
			<RouteCard className="card">
				<h5>{error}</h5>
				<p> {errorMore} </p>
			</RouteCard>
		);
	}
};

export default InfoRoute;
