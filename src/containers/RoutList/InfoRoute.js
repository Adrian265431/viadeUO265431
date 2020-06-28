import React from "react";
import { DivInfo, FormRenderContainer } from "../RoutList/myroutes.style";
import RouteMap from "./RouteMap";
import i18n from "i18n";

const InfoRoute = (props) => {
	const { name, author, description, categoria, points, center} = props;

		return (
			<DivInfo className="card" id="card">
					<h2>{name}</h2>
					<h3> {i18n.t("routList.author")} </h3>
					<p>{author}</p>
					<h3> {i18n.t("routList.description")}</h3>
					<p>{description}</p>
					<h3> {i18n.t("routList.category")}</h3>
					<p>{categoria}</p>
					<br />
					<FormRenderContainer id="mapa">
						<RouteMap markers={points} center={center} />
					</FormRenderContainer>
					<br />
			</DivInfo>
		);
		
};

export default InfoRoute;
