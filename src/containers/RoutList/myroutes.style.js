import styled from "styled-components";

export const DivInfo = styled.div`
	overflow: hidden;
	margin: 15px auto;
	max-width: 78% !important;
	padding: 5px 15px !important;
	text-align: center;
	background: white;
	a {
		text-decoration: none;
		&:hover {
			text-decoration: underline;
			text-decoration-color: white;
		}
	}
	h5 {
		text-color: black;
	}
	p {
		font-weight: bold;
		font-size: 20px;
	}
	h2 {
		font-weight: bold;
	}
	h3 {
		font-size: 25px;
		margin: 0 0 0px 0;
	}
	#containerRuta {
		padding: 0px 25px !important;
		a {
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}
		}
		p {
			font-weight: bold;
			font-size: 20px;
		}
		h2 {
			font-weight: bold;
		}
		h3 {
			font-size: 25px;
			margin: 0 0 0px 0;
		}
	}
`;

export const Div = styled.div`
	overflow: hidden;
	display: flex;
	input {
		max-width: 40% !important;
	}
	flex: 1 0 auto;
	align-items: center;
	justify-content: center;
	background-position: center;
	background-attachment: fixed;
	background-size: cover;
	padding: 60px 0;
`;
export const MyRouteContainer = styled.div`
	overflow: hidden;
	h5 {
		color: grey;
	}
	a {
		color: grey;
	}
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
	background: #8FB4D0;
	max-width: 900px;
	margin: 0 20px;
	width: 100%;
	flex: 1 0 auto;
`;
export const FormRenderContainer = styled.div`
  #mapa{
    width: 500px;
    height: 300px;
    padding: 0px !IMPORTANT;
  }
`;

export const Header = styled.div`
	overflow: hidden;
	display: flex;
	position: relative;
	align-items: center;
	text-align: center;
	display: block;
	justify-content: center;
	padding: 10px 5px;
`;

