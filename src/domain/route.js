export default class Route {
	webId = "";
	points = [];

	constructor(name, author, description, points, categoria, content) {
		this.name = name;
		this.author = author;
		this.description = description;
		this.points = points;
		this.categoria = categoria;
		this.content = content;
	}

	calculateCenter() {
		let center = [];
		let lat;
		let lng;
		let c = this.points.length % 2;
		for (let i = 0; i < this.points.length; i++) {
			if (i === c) {
				lat = parseFloat(this.points[parseInt(i)].latitude);
				lng = parseFloat(this.points[parseInt(i)].longitude);
			}
		}
		center = [ lat, lng ];
		return center;
	}
}
