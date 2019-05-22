import React, { useEffect } from "react";
// @ts-ignore
import { Helmet } from "react-helmet";

const HeadLinks = () => {

	useEffect(() => {
		/**
		 * Due to the stylesheet being global the stylesheets are interfering with other pages
		 * So we have to select all the stylesheets with data-linkRole=stylesheet attribute
		 * And enable them when the component mounts and also disable them when the component un-mounts.
		 */
		const links = document.querySelectorAll<HTMLLinkElement>("[data-linkRole=stylesheet]");
		links.forEach((link) => {
			link.disabled = false;
		});
		return () => {
			links.forEach((link) => {
				link.disabled = true;
			});
		};
	}, []);

	return (

		<Helmet>
			<title>My Ragp Blog</title>
			<meta charSet="utf-8" />
			<meta name="author" content="Graphicfort" />
			<meta name="robots" content="index follow" />
			<meta name="googlebot" content="index follow" />
			<meta name="keywords" content="LUNE, HTML5, CSS3, Creative, Landing Page, Pack, Template, Create a website fast" />
			<meta name="description" content="HTML5 Landing Pages Pack Template, Create a website fast" />

			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="apple-mobile-web-app-status-bar-style" content="black" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

			<link rel="shortcut icon" href="images/icons/favicon.ico" />
			<link rel="apple-touch-icon" sizes="57x57" href="images/icons/apple-touch-icon-57x57.png" />
			<link rel="apple-touch-icon" sizes="60x60" href="images/icons/apple-touch-icon-60x60.png" />
			<link rel="apple-touch-icon" sizes="72x72" href="images/icons/apple-touch-icon-72x72.png" />
			<link rel="apple-touch-icon" sizes="76x76" href="images/icons/apple-touch-icon-76x76.png" />
			<link rel="apple-touch-icon" sizes="114x114" href="images/icons/apple-touch-icon-114x114.png" />
			<link rel="apple-touch-icon" sizes="120x120" href="images/icons/apple-touch-icon-120x120.png" />
			<link rel="apple-touch-icon" sizes="144x144" href="images/icons/apple-touch-icon-144x144.png" />
			<link rel="apple-touch-icon" sizes="152x152" href="images/icons/apple-touch-icon-152x152.png" />
			<link rel="apple-touch-icon" sizes="180x180" href="images/icons/apple-touch-icon-180x180.png" />

			<link
				href="../../../../fonts.googleapis.com/csse3e5.css?family=Montserrat:400,700"
				rel="stylesheet"
				type="text/css"
			/>
			<link
				href="../../../../fonts.googleapis.com/css6109.css?family=Poppins:400,500,600,700"
				rel="stylesheet"
				type="text/css"
			/>
			<link data-linkRole="stylesheet" rel="stylesheet" href={process.env.PUBLIC_URL + "/css/bootstrap.min.css"} />
			<link data-linkRole="stylesheet" rel="stylesheet" href={process.env.PUBLIC_URL + "/css/style.css"} />
			<link data-linkRole="stylesheet" rel="stylesheet" href={process.env.PUBLIC_URL + "/css/responsive.css"} />
			<link data-linkRole="stylesheet" rel="stylesheet" href={process.env.PUBLIC_URL + "/css/color.css"} />
		</Helmet>
	);
};

export default HeadLinks;
