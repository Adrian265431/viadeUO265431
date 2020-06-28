import React, { useState } from "react";
import i18n from "i18n";
import { Route } from "../../domain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { errorToaster, successToaster } from "../../utils";
import * as viadeManager from "../../utils/viadeManagerSolid";
import { ParserFile } from "../../utils/parserFile";
import { Section,DivMax,TextArea,Input} from "./uploadRoute.style";

type Props = {
	webId: String
};

const UploadRoute = ({ webId }: Props) => {
	const webID = webId;
	const [ name, setName ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ category, setCategory ] = useState("");
	const [ fileToParse, setFileToParse ] = useState("");
	let file = React.createRef();
	let points = [];

	const parser = new ParserFile();

	function chooseParser(file) {
		
			try {
				points = parser.parserGeoJSON(file);
			} catch (error) {
				
			}
		
	}

	function handleNameChange(event) {
		event.preventDefault();
		setName(event.target.value);
	}
	function handleDescriptionChange(event) {
		event.preventDefault();
		setDescription(event.target.value);
	}
	function handleCategoryChange(event) {
		event.preventDefault();
		setCategory(event.target.value);
	}

	function loaded(file) {
		setFileToParse(file.target.result.toString());
	}

	function handleUpload(event) {
		event.preventDefault();
		if (file.current.files.length > 0) {
			var reader = new FileReader();
			reader.readAsText(file.current.files[0]);
			reader.onload = loaded;
		}
	}

	function handleSave(event) {
		if (name.length === 0) {
			errorToaster(i18n.t("uploadRoute.errorName"), "ERROR");
		} else if (description.length === 0) {
			errorToaster(i18n.t("uploadRoute.errorDescription"), "ERROR");
		} else if (category.length === 0) {
			errorToaster(i18n.t("uploadRoute.errorCategory"), "ERROR");
		} else {
			chooseParser(fileToParse);
			if (fileToParse === "") {
				errorToaster(i18n.t("uploadRoute.errorNoFile"), "ERROR");
			} else {
				if (points.length === 0) {
					errorToaster(i18n.t("uploadRoute.errorFile"), "ERROR");
				} else {
					let author = webID.replace("https://", "");
					author = author.replace(".solid.community/profile/card#me", "");
					author = author.replace(".inrupt.net/profile/card#me", "");

					let route = new Route(name, author, description, points, category);
					viadeManager.addRoute(route, webID);
					successToaster(i18n.t("uploadRoute.successRoute"), i18n.t("uploadRoute.success"));
				}
			}
			event.preventDefault();
		}
	}
	return (
		<Section data-testid="route-wrapper">
			<div>
				<div data-testid="route-header">
					<h1>{i18n.t("uploadRoute.tittle")}</h1>
				</div>
				<form>
					<div>
						<label>
							{i18n.t("uploadRoute.name")}
							<Input type="text" data-testid="route_name" onChange={handleNameChange} />
						</label>
						<label>
							{i18n.t("uploadRoute.description")}
							<TextArea
								type="text"
								data-testid="route_description"
								name="description"
								rows="5"
								onChange={handleDescriptionChange}
							/>
						</label>
					
						<label>
							{i18n.t("uploadRoute.category")}
							<Input type="text" data-testid="route_name" onChange={handleCategoryChange} />
						</label>
					</div>

					<div>
						<label>
							{i18n.t("uploadRoute.uploadFile")}
							<Input type="file" ref={file} onChange={handleUpload} data-testid="file-input" />
						</label>
					</div>
				</form>
				<hr />
				<DivMax>
				<button data-testid="bt-save" id="butonSave" onClick={handleSave}>
						<FontAwesomeIcon icon="save" className="save-icon" title={i18n.t("uploadRoute.btnSave")} />
							{"	" + i18n.t("uploadRoute.btnSave")}
				</button>
				</DivMax>
			</div>
		</Section>
	);
};

export default UploadRoute;