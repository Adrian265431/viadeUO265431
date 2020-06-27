import { Route, Point } from "domain";
import rutaShape from "@contexts/route-shape.json";
import auth from "solid-auth-client";
import * as ldflexHelper from "./ldflex-helper";
import * as storageHelper from "./storage";
const routePath = process.env.REACT_APP_VIADE_ROUTES_PATH;

const FC = require("solid-file-client");
const fc = new FC(auth);
const N3 = require("n3");

export const createRouteFromData = async (folder) => {
	let routes = [];
		for (const element of folder) {
			let quadStream = await fc.readFile(element.url);
			const turtleParser = new N3.Parser({ format: "Turtle" });
			let name,
				description,
				author,
				categoria,
				latitude,
				longitude = "";
			let points = [];
			// eslint-disable-next-line
			turtleParser.parse(quadStream, async (err, quad, prefixes) => {
				if (err) {
					throw err;
				}
				if (quad) {
					if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[1], rutaShape)) {
						name = quad.object.value;
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[2], rutaShape)) {
						description = quad.object.value;
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[3], rutaShape)) {
						author = quad.object.value;
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[4], rutaShape)) {
						categoria = quad.object.value;
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[6], rutaShape)) {
						longitude = quad.object.value;
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[7], rutaShape)) {
						latitude = quad.object.value;
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[5], rutaShape)) {
						let point = new Point(latitude, longitude);
						points.push(point);
					}
				} else {
					let ruta = new Route(name, author, description, points, categoria, quadStream);
					routes.push(ruta);
				}
			});
		
	}
	return routes;
};

export const getRoutesFromPod = async (webId) => {
	var path = await storageHelper.getAppStorage(webId, routePath);
	const routesFolderExists = await ldflexHelper.resourceExists(path);
	if (!routesFolderExists) {
		return "EMPTY";
	} else {
		var folder = await fc.readFolder(path);
		if (folder.files.length <= 0) {
			return "EMPTY";
		} else {
			return await createRouteFromData(folder.files);
		}
	}
};

