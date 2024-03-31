import { useDispatch } from "react-redux";

import { update } from "../../store/AccountSlice";
import { login } from "../../store/LoginSlice";

import Common from "./Common";

import { Link } from "react-router-dom";
import { Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";

import { signup } from "../../Data/Form";

import styles from "../../styles/Form.module.css";

const SignUp = () => {

	const dispatch = useDispatch();
	
	const submitHandler = async (event) => {
		
		event.preventDefault();
		
		const obj = {
			fname: event.target[0].value.trim(),
			lname: event.target[1].value.trim(),
			dob: event.target[2].value.trim(),
			email: event.target[3].value.trim(),
			password: event.target[4].value.trim(),
			gender: event.target[5].value.trim(),
			country: event.target[6].value.trim(),
			address: event.target[7].value.trim(),
			pinCode: event.target[8].value.trim(),
			college: event.target[9].value.trim(),
			university: event.target[10].value.trim(),
			roll: event.target[11].value.trim(),
			course: event.target[12].value.trim(),
			type: event.target[13].value.trim(),
			specialisation: event.target[14].value.trim(),
			duration: event.target[15].value.trim(),
			grad: event.target[16].value.trim(),
			status: event.target[17].value.trim(),
		};

		const response = await fetch(
			process.env.REACT_APP_FETCH_URL + "/register/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(obj),
			}
		).then((res) => res.json());

		if(response.code === 200){
			const _id = response._id;
			dispatch(update({
				_id,
				obj
			}));
			dispatch(login({
				email: obj.email,
				password: obj.password
			}));
		}
	};

	return (
		<>
			<Row>
				<Common />
				<Col sm={7} lg={8}>
					<h3 className="text-center mt-3">SIGN UP</h3>
					<Form onSubmit={submitHandler} className={styles.form}>
						<div className="text-center">
							<h6 className="mb-3">
								Already have an account?{" "}
								<Link to="/signin">Sign-in</Link>
							</h6>
						</div>
						<Row>
							{signup.map((field) => (
								<Col
									md={6}
									lg={4}
									className="mt-3"
									key={field.label}
								>
									<FloatingLabel
										type={field.type}
										label={field.label}
									>
										{field.type === "select" ? (
											<Form.Select
												name={field.label}
												style={{
													border: "1px solid black",
												}}
											>
												{field.options.map((option) => (
													<option
														value={option}
														key={option}
													>
														{option}
													</option>
												))}
											</Form.Select>
										) : (
											<Form.Control
												type={field.type}
												placeholder={field.label}
												required={field.required}
												key={field.label}
												name={field.label}
												style={{
													border: "1px solid black",
												}}
											/>
										)}
									</FloatingLabel>
								</Col>
							))}
							<Col lg={7} className="mt-4">
								<Form.Check
									checked
									label="I have read and hereby accept all Terms and Conditions."
									style={{ fontWeight: "bold" }}
									name="t&c"
									readOnly
								/>
							</Col>
							<Col lg={5} className="mt-3">
								<Button
									type="submit"
									variant="primary"
									style={{
										width: "100%",
										backgroundImage:
											"linear-gradient(to bottom right, blue, #05a1f0)",
										border: "none",
									}}
									className="mb-5"
								>
									<h5>Create Account</h5>
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</>
	);
};

export default SignUp;
