import { Map, GoogleApiWrapper, Marker, Polyline, HeatMap} from "google-maps-react";
import React from "react";
import update from "react-addons-update";

const mapStyle = {
	paddingBottom: "10px",
	height: "80%",
	width: "75%"
};

var heatMap = [];

var count = 0;
var dataActualizada = [];
var gradient = [
	"rgba(0, 255, 255, 0)",
	"rgba(0, 255, 255, 1)",
	"rgba(0, 191, 255, 1)",
	"rgba(0, 127, 255, 1)",
	"rgba(0, 63, 255, 1)",
	"rgba(0, 0, 255, 1)",
	"rgba(0, 0, 223, 1)",
	"rgba(0, 0, 191, 1)",
	"rgba(0, 0, 159, 1)",
	"rgba(0, 0, 127, 1)",
	"rgba(63, 0, 91, 1)",
	"rgba(127, 0, 63, 1)",
	"rgba(191, 0, 31, 1)",
	"rgba(255, 0, 0, 1)"
];
export class MapContainer extends React.Component {
	sendData = () => {
		this.props.parentCallBack(this.state.markers);
	};
	state = {
		markers: [],
		mapCovid: [],
		currentZoom: null,
		isHeatVisible: false,
		activeMarker: null,
	};

	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState({
					center: {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
				});
			});
		}
	}

	componentWillUnmount() {
		dataActualizada = [];
		heatMap = [];
		count = 0;
	}

	groupByArray(xs, key) {
		return xs.reduce(function(rv, x) {
			let v = key instanceof Function ? key(x) : x[key];
			let el = rv.find((r) => r && r.key === v);
			if (el) {
				el.values.push(x);
			} else {
				rv.push({ key: v, values: [ x ] });
			}
			return rv;
		}, []);
	}

	iniciateMarkers() {
		if (!this.state.mapCovid.length > 0 && dataActualizada.length > 0 && count === 0) {
			let mapCovid = this.state.mapCovid;
			// eslint-disable-next-line
			const geoJson = {
				type: "FeatureCollection",
				// eslint-disable-next-line
				features: dataActualizada.map((country = {}) => {
					if (country.Latitude && country.Longitude) {
						mapCovid = update(mapCovid, {
							$push: [
								{
									lat: country.Latitude,
									lng: country.Longitude,
									recuperados: country.Recovered,
									muertes: country.Deaths,
									casos: country.Confirmed,
									country_p: country.Country_Region,
									region: country.AdminRegion1,
									city: country.AdminRegion2,
									updated: country.Updated
								}
							]
						});
					}
				})
			};
			this.setState({ mapCovid });
			count = 1;
			this.sendData();
		}
	}

	clickPoint = (event, map, clickEvent) => {
		let { markers } = this.state;
		markers = update(markers, {
			$push: [
				{
					position: {
						lat: clickEvent.latLng.lat(),
						lng: clickEvent.latLng.lng()
					},
					index: this.state.markers.length,
					defaultAnimation: 2,
					key: this.state.markers.length
				}
			]
		});
		this.setState({ markers });
		this.sendData();
	};

	draw() {
		let markers = [];
		for (let i = 0; i < this.state.markers.length; i++) {
			markers.push({
				lat: this.state.markers[parseInt(i)].position.lat,
				lng: this.state.markers[parseInt(i)].position.lng
			});
		}
		return markers;
	}

	onMarkerClick = (props, marker, e) => {
		let markers2 = props.markersList;
		for (var i = 0; i < markers2.length; i++) {
			if (markers2[i].key === props.index) {
				markers2.splice(i, 1);
				this.setState({ markers2 });
				this.sendData();
			}
		}
	};

	handleToggle = () => {
		this.setState({ isHeatVisible: !this.state.isHeatVisible });
	};
	handleMouseOver = (props, marker, e) => {
		this.setState({
			activeMarker: marker,
		});
	};

	handleZoom = (props, map, e) => {
		this.setState({
			currentZoom: map.zoom
		});
		console.log(this.state.currentZoom);
	};

	close = () => {
		this.setState({
			activeMarker: null,
		});
	};

	render() {
		this.getLocation();

		heatMap = (
			<HeatMap
				visible={this.state.isHeatVisible}
				gradient={gradient}
				opacity={1}
				positions={this.state.mapCovid}
				radius={20}
				center={this.state.center}
				heatmapMode={"POINTS_WEIGHT"}
			/>
		);
		return (
			<Map
				google={this.props.google}
				zoom={13}
				minZoom={3}
				onZoomChanged={this.handleZoom}
				style={mapStyle}
				heatmapLibrary={true}
				onClick={this.clickPoint}
				center={this.state.center}
				gestureHandling={"cooperative"}>
				
				{this.state.isHeatVisible ? heatMap : null}

				{this.state.mapCovid.map((point) => {
					return (
						<Marker
							position={{ lat: point.lat, lng: point.lng }}
							c={point}
							cursor={"hand"}
							icon={"http://maps.google.com/mapfiles/ms/icons/red.png"}
							visible={this.state.currentZoom >= 8 && this.state.isHeatVisible}
							onMouseover={this.handleMouseOver}
							key={point.key}
							tracksViewChanges={false}
						/>
					);
				})}

				{this.state.markers.map((marker) => {
					return (
						<Marker
							key={marker.position.lat + marker.position.lng}
							position={{ lat: marker.position.lat, lng: marker.position.lng }}
							icon={"http://maps.google.com/mapfiles/ms/icons/red.png"}
							markersList={this.state.markers}
							index={marker.key}
							onClick={this.onMarkerClick}
						/>
					);
				})}
				<Polyline path={this.draw()} strokeColor="#ff2527" strokeOpacity={0.75} strokeWeight={2} />
			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "",
	libraries: [ "visualization" ]
})(MapContainer);
