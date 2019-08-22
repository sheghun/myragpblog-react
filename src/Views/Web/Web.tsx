import { StyleRulesCallback } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import Typed from "react-typed";
import styled, { keyframes } from "styled-components";
import subBackgroundImage from "../../assets/images/subscribe-background.jpg";
import PeopleImage from "../../assets/images/undraw_people_search_wctu.svg";
import Header from "./Header";
import HeadLinks from "./HeadLinks";

const Displace = keyframes`
	from {
		transform: translateY(-2%)
	}

	to {
		transform: translateY(2%)
	}
`;

const PeopleSearchImage = styled.img`
	animation: ${Displace} 3s ease-in-out infinite alternate;
	width: 100%;
	@media (max-width: 600px) {
		width: 90%;
	}
`;
const Web = () => {

	return (
		<>
			<HeadLinks />

			<div className="loader-block" style={{ display: "none" }}>

				<div className="loader-block-container">
					<div className="circle-block circle-block-style-6" />
				</div>
			</div>

			<div id="up-button">
				<a href="javascript:void(0)" title="To Top"><i className="fa fa-angle-up" /></a>
			</div>

			<div id="main-wrapper">

				<Header />

				<div id="hero-section-11" className="hero-section black-section section-lg-padding">

					<div
						className={`section-container`}
						id="first-section"
						style={{
							backgroundColor: "white",
						}}
					>

						{/* <div className="background-image-block parallax-effect gfort-background">
							<img src={PeopleImage} alt="Parallax Image" />
						</div> */}

						<div
							className="container bg-white"
						>

							<div className="row">

								<div className="col-lg-8 col-md-8 title-block">

									<div
										className="title-block-container white-content"
									>

										<h1
											className="sm-heading"
											style={{
												color: "black",
												marginTop: "4rem",
											}}
										>
											<Typed
												strings={[
													"THE ULTIMATE THIRD PARTY TOOL",
													"A FULLY AUTOMATED MARKETING NETWORK BUILDING SYSTEM",
												]}
												typeSpeed={40}
												showCursor={false}
												backDelay={5000}
												backSpeed={60}
												loop={true}
											/>
										</h1>
									</div>
								</div>
								<div
									className="col-lg-4 col-md-4"
								>
									<PeopleSearchImage
										src={PeopleImage}
										width="100%"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="content-section-28" className="content-section white-section">

					<div className="section-container">

						<div className="container">

							<div className="row">

								<div className="col-lg-10 col-lg-offset-1 col-md-12">

									<div className="row">

										<div className="col-md-12 title-block">

											<div className="title-block-container">

												<h2>A FULLY AUTOMATED MARKETING & NETWORK BUILDING SYSTEM.</h2>

												<div className="line-separator" />
											</div>
										</div>

										<div className="col-md-12 content-block">

											<div className="content-block-container">

												<p>
													Finally, the most effective prospecting, recruiting, training &amp; support systems (all rapped up in one) at your finger tips.the dream of all network marketers finally realized. now you can truly do your <strong>RAGP</strong> business the 21st century way with a fully automated marketing &amp; network building system!! no more endless whatsapp posts &amp; lengthy talks: just share your blog link, guide your prospect to properly navigate the blog, and let the blog do the magic!
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="content-section-31" className="content-section grey-section">

					<div className="section-container">

						<div className="container">

							<div className="row">

								<div className="col-sm-12">

									<div className="row">

										<div className="col-md-12 title-block">

											<div className="title-block-container">

												<h2>WHY SHOULD I SUBSCRIBE TO MYRAGPBLOG.COM</h2>

												<div className="line-separator" />
											</div>
										</div>

										<div className="col-md-12 content-block">

											<div className="content-block-container">

												<p>

													Recharge And Get Paid is an amazing business and money making opportunity the best business opportunity available for the common man in Nigeria to start a business, create wealth, achieve financial freedom and escape poverty today!. The <strong>RAGP</strong> business is no doubt a fast vehicle for wealth creation, much like a bullet train! but to run as fast you can with it, you need rails to run on, you need an effective system for prospecting, recruiting, training &amp; support that you can use to build that large <strong>RAGP</strong> network &amp; make that big money you're dreaming of super fast. We are that high speed automated system you've been looking for we provide you with all the resources &amp; support systems you need to succeed in building your ragp business!
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="content-section-32"
					className="content-section white-section"
				>

					<div className="section-container">

						<div className="container">

							<div className="row">

								<div className="col-lg-10 col-lg-offset-1 col-md-12 title-block">

									<div className="title-block-container text-center">

										<h2>BENEFITS OF SUBSCRIBING FOR THE BLOG:</h2>

										<p>
											You stand to benefit the following from our system
										</p>

										<div className="line-separator" />
									</div>
								</div>

								<div className="col-md-6 padding-top-100">

									<div className="row">

										<div
											className="col-md-12 content-block content-block-style-3"
											data-gfort-swiper-slide-to="1"
										>

											<div className="content-block-container text-right">

												<i className="fa fa-diamond circle-icon-block circle-icon-block-lg" />

												<h4>An Effective Prospecting &amp; Presenting Tool</h4>

												<p>
													Our system is designed to serve you as an effective third party tool for sharing and explaining the <strong>RAGP</strong> business opportunity to your prospects. By thoroughly navigating the blog, your prospects get a comprehensive, concise and compelling information, understanding and appreciation of the ragp business opportunity in no time
												</p>
											</div>
										</div>

										<div
											className="col-md-12 content-block content-block-style-3"
											data-gfort-swiper-slide-to="2"
										>

											<div className="content-block-container text-right">

												<i className="fa fa-book circle-icon-block circle-icon-block-lg" />

												<h4>A High Rate Conversion &amp; Recruitment Tool</h4>

												<p>
													Beyond furnishing your prospects with a compelling &amp; persuasive understanding of the <strong>RAGP</strong> business opportunity, the blog is designed to efficiently help you convert your prospects into downlines, by systematically guiding &amp; leading them to join the business and register as your ragp downlines; even without your knowledge and involvement all you need to do is share the blog link with then and let the blog do the rest expect up to 50% conversion rate of prospects to downlines as you effectively deploy &amp; use the blog.
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className="col-md-6 pull-right padding-top-100">

									<div className="row">

										<div className="col-md-12 content-block content-block-style-3"
											data-gfort-swiper-slide-to="4">

											<div className="content-block-container">

												<i className="fa fa-code circle-icon-block circle-icon-block-lg" />

												<h4>A Powerful Training Tool</h4>

												<p>
													It’s not enough to convert a prospect into a downline, he/she also needs to be trained to become an effective and productive networker &amp; RAGP(ER)! the blog is also designed and equipped to serve this all important purpose of training new downlines and providing them with all the resources they need to succeed in the ragp network marketing business!
												</p>
											</div>
										</div>

										<div className="col-md-12 content-block content-block-style-3"
											data-gfort-swiper-slide-to="5">

											<div className="content-block-container">

												<i className="fa fa-google circle-icon-block circle-icon-block-lg" />

												<h4>That Essential Support System</h4>

												<p>
													Beyond training, you &amp; your downlines need an ongoing support system in other to survive the rigourous &amp; challenges of building a successful network marketing business. myragpblog.com is especially designed, programed and equiped to provide you with that timely &amp; useful support 24/7.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="subscribe-section-3" className="subscribe-section black-section">

					<div className="section-container">

						<div className="background-image-block parallax-effect gfort-background">
							<img src={subBackgroundImage} alt="Parallax Background" />
						</div>

						<div className="container">

							<div className="row">

								<div className="col-lg-10 col-lg-offset-1 col-md-12 title-block">

									<div className="title-block-container white-content text-center">

										<h2>SUBSCRIBE NOW (JOIN US)</h2>

										<div className="line-separator" />
									</div>
								</div>

								<div className="col-lg-8 col-lg-offset-2 col-md-12 form-block subscribe-form-block">

									<div className="form-block-container white-content text-center">
										<div className="col-sm-offset-4 col-md-4">
											<div className="form-group">
												<Link to="/register" type="submit" className="btn btn-gfort wave-effect">
													REGISTER
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="content-section-31" className="content-section grey-section">

					<div className="section-container">

						<div className="container">

							<div className="row">

								<div className="col-lg-12">

									<div className="row">

										<div className="col-md-12 title-block">

											<div className="title-block-container" id="features-of-the-blog">

												<h2>Features Of The Blog</h2>

												<div className="line-separator" />
											</div>
										</div>

										<div className="col-md-12 content-block">

											<div className="content-block-container">

												<p>Our Features.</p>
											</div>
										</div>

										<div className="col-md-6 content-block">

											<div className="content-block-container">

												<i className="fa fa-diamond circle-icon-block circle-icon-block-lg" />

												<h4>
													A Multi-Media: Presentation Of The RAGP Business
												</h4>

												<p>
													We furnishe your prospects with a concise and comprehensive presentation of the RAGP business in all available media formats: in text, video, audio, picture, etc formats.
												</p>
											</div>
										</div>

										<div className="col-md-6 content-block">

											<div className="content-block-container">

												<i className="fa fa-book circle-icon-block circle-icon-block-lg" />

												<h4><a href="#" title="Well Documented">Constant Updating Of Content</a></h4>

												<p>
													Keep abreast with the happenings, developments and progress in our ever dynamic RAGP business, the blog content is updated steadily to ensure that you remain current and stay ahead in the business.
												</p>
											</div>
										</div>

										<div className="col-md-6 content-block">

											<div className="content-block-container">

												<i className="fa fa-book circle-icon-block circle-icon-block-lg" />

												<h4><a href="#" title="Well Documented">Customized Blogs For You &amp; Your Downlines</a></h4>

												<p>
													Upon subscription, you can quickly customize your blog by fitting into it your ragp username/referral id, your whatsapp number, your profile pictures, your email address, etc. so that your prospects, after navigating the blog, have no doubt who to join as they decide to join/start their ragp business.
												</p>
											</div>
										</div>

										<div className="col-md-6 content-block">

											<div className="content-block-container">

												<i className="fa fa-book circle-icon-block circle-icon-block-lg" />

												<h4><a href="#" title="Well Documented">A Lucrative Income Stream</a></h4>

												<p>
													Besides helping you to effectively build your ragp business, the blog also affords you the opportunity to make good money from others people’s subscription and renewal fees. you'll find the myragpblog.com compensation plan very rewarding, making you the winner in more ways than one.
												</p>
											</div>
										</div>

										<div className="col-md-6 content-block">

											<div className="content-block-container">

												<i className="fa fa-book circle-icon-block circle-icon-block-lg" />

												<h4><a href="#" title="Well Documented">Unbeatable Customer Care System</a></h4>

												<p>
													No system is perfect &amp; error free, so we expect you to experience some challenges every now and then as you use the blog. we've preempted that by building into the system a super responsive customer care service to make your experience of the blog as painless as possible!
												</p>
											</div>
										</div>

										<div className="col-md-6 content-block">

											<div className="content-block-container">

												<i className="fa fa-code circle-icon-block circle-icon-block-lg" />

												<h4><a href="#" title="Clean code">Very Rich &amp; Up To Date Content</a></h4>

												<p>
													The blog is laced with super rich persuasive contents aimed at stirring and moving your prospects and downlines to take right actions that will lead to success for both you and them.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <div id="testimonials-section-11" className="testimonials-section black-section">

					<div className="section-container">

						<div className="background-image-block parallax-effect gfort-background">
							<img src="images/testimonials/testimonials-013.jpg" alt="Parallax Background Image" />
						</div>

						<div className="container">

							<div className="row">

								<div className="gfort-swiper-slider" data-swiper-items="1">

									<div className="swiper-wrapper">

										<h1 style={{ color: " white", textAlign: "center" }}>Testimonies</h1>

										<div className="swiper-slide">

											<div className="swiper-slide-container">

												<div
													className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 testimonials-block testimonials-block-style-5">

													<div className="testimonials-block-container white-content">

														<div className="image-block">

															<div className="image-block-container">
																<img src="images/testimonials/testimonials-001.jpg"
																	alt="Image Block" />
															</div>
														</div>

														<div className="testimonials-block-desc">
															<p>Growth hacking supply chain facebook graphical user interface
                                                                early adopters A/B testing pitch crowdsource beta incubator
                                                    branding series A financing.</p>
														</div>

														<div className="testimonials-block-title">
															<h4>Blanche</h4>
															<h5><a href="#" title="graphicfort">graphicfort</a></h5>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="swiper-slide">

											<div className="swiper-slide-container">

												<div
													className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 testimonials-block testimonials-block-style-5">

													<div className="testimonials-block-container white-content">

														<div className="image-block">

															<div className="image-block-container">
																<img src="images/testimonials/testimonials-002.jpg"
																	alt="Image Block" />
															</div>
														</div>

														<div className="testimonials-block-desc">
															<p>Backing interaction design gen-z technology deployment
                                                                accelerator ramen investor handshake research &amp; development
                                                    founders business plan first mover advantage.</p>
														</div>

														<div className="testimonials-block-title">
															<h4>Arthur</h4>
															<h5><a href="#" title="graphicfort">graphicfort</a></h5>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="swiper-slide">

											<div className="swiper-slide-container">

												<div
													className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 testimonials-block testimonials-block-style-5">

													<div className="testimonials-block-container white-content">

														<div className="image-block">

															<div className="image-block-container">
																<img src="images/testimonials/testimonials-003.jpg"
																	alt="Image Block" />
															</div>
														</div>

														<div className="testimonials-block-desc">
															<p>Release bandwidth user experience research &amp; development
                                                                branding termsheet business plan advisor analytics ecosystem
                                                    entrepreneur freemium.</p>
														</div>

														<div className="testimonials-block-title">
															<h4>Abelle</h4>
															<h5><a href="#" title="graphicfort">graphicfort</a></h5>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="swiper-pagination" />

									<div className="swiper-button-prev">
										<i className="fa fa-angle-left" />
									</div>

									<div className="swiper-button-next">
										<i className="fa fa-angle-right" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> */}

				<div id="team-section-8" className="team-section white-section">

					<div className="section-container">

						<div className="container">

							<div className="row">

								<div className="col-lg-10 col-lg-offset-1 col-md-12 title-block">

									<div className="title-block-container text-center">

										<h2>OUR TEAM</h2>

										<div className="line-separator" />
									</div>
								</div>

								<div className="col-md-offset-3 col-md-3 col-sm-6 team-block team-block-style-2">

									<div className="team-block-container">

										<div className="image-block">

											<div className="image-block-container">
												<img src="images/team/team-036.jpg" alt="Image Block" />
											</div>
										</div>

										<div className="team-block-title">
											<h4><a href="#" title="Oladiran Segun Solomon">OLADIRAN SEGUN</a></h4>
											<h6 className="main-color">DEVELOPER</h6>
										</div>

										<div className="social-icons-block social-icons-block-sm social-icons-block-style-2">
											<ul>
												<li><a href="#" title="Facebook"><i className="fa fa-facebook" /></a></li>
												<li><a href="#" title="Twitter"><i className="fa fa-twitter" /></a></li>
												<li><a href="#" title="Github"><i className="fa fa-github" /></a></li>
											</ul>
										</div>
									</div>
								</div>

								<div className="col-md-3 col-sm-6 team-block team-block-style-2">

									<div className="team-block-container">

										<div className="image-block">

											<div className="image-block-container">
												<img src="images/team/team-039.jpg" alt="Image Block" />
											</div>
										</div>

										<div className="team-block-title">
											<h4><a href="#" title="APOLLINE">MARK PHILIP</a></h4>
											<h6 className="main-color">CONTENT WRITTER</h6>
										</div>

										<div className="social-icons-block social-icons-block-sm social-icons-block-style-2">
											<ul>
												<li><a href="#" title="Twitter"><i className="fa fa-twitter" /></a></li>
												<li><a href="#" title="Behance"><i className="fa fa-behance" /></a></li>
												<li><a href="#" title="Dribbble"><i className="fa fa-dribbble" /></a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="contact-section-14" className="contact-section white-section">

					<div className="section-container">

						<div className="container">

							<div className="row">

								<div className="col-lg-10 col-lg-offset-1 col-md-12 title-block">

									<div className="title-block-container text-center">

										<h2>GET IN TOUCH</h2>

										<p>Reach us on this platforms</p>

										<div className="line-separator" />
									</div>
								</div>

								<div className="col-md-12 form-block contact-form-block">

									<div style={{ display: "flex", justifyContent: "center" }}>
										<div style={{ textAlign: "center", fontWeight: 700 }}>
											<span>Customer Care:</span> 09123472902
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="social-section-17" className="social-section grey-section section-xs-padding">

					<div className="section-container">

						<div className="container">

							<div className="row">

								<div
									className="col-md-12 social-icons-block social-icons-block-style-2 social-icons-block-md social-icons-block-lg-margin text-center">
									<ul>
										<li>
											<a href="#" title="Facebook">
												<i className="fa fa-facebook" />
												<span>Facebook</span>
											</a>
										</li>
										<li>
											<a href="#" title="Google Plus">
												<i className="fa fa-google-plus" />
												<span>Google+</span>
											</a>
										</li>
										<li>
											<a href="#" title="Twitter">
												<i className="fa fa-twitter" />
												<span>Twitter</span>
											</a>
										</li>
										<li>
											<a href="#" title="youtube">
												<i className="fa fa-youtube-play" />
												<span>Youtube</span>
											</a>
										</li>
										<li>
											<a href="#" title="Behance">
												<i className="fa fa-behance" />
												<span>Behance</span>
											</a>
										</li>
										<li>
											<a href="#" title="Pinterest">
												<i className="fa fa-pinterest" />
												<span>Pinterest</span>
											</a>
										</li>
										<li>
											<a href="#" title="Dribbble">
												<i className="fa fa-dribbble" />
												<span>Dribbble</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				<footer id="footer-section-4" className="footer-section white-section section-xs-padding">

					<div className="section-container">

						<div className="container">

							<div className="row">

								<div className="col-md-12 widget-block link-widget-block link-widget-block-style-1">

									<div className="widget-block-container">

										<div className="widget-block-content">
											<ul>
												<li><a href="#" title="About">ABOUT US</a></li>
												<li><a href="#" title="Blog">BLOG</a></li>
												<li><a href="#" title="Privacy Policy">PRIVACY POLICY</a></li>
												<li><a href="#" title="Terms of use">TERMS OF USE</a></li>
												<li><a href="#" title="Advertise">ADVERTISE</a></li>
												<li><a href="#" title="Contact us">CONTACT US</a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer>

				<footer id="copyright-section-1" className="copyright-section copyright-section-style-1 white-section">

					<div className="section-container">

						<div className="container">

							<div className="row">

								<div className="col-md-12 copyright-block">

									<div className="copyright-block-container text-center">

										<p>&copy; 2016 <a href="#" title="Graphicfort">Graphicfort</a>, all rights reserved.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</div>

		</>
	);
};

export default Web;
