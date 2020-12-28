import React from 'react'
// import { Link } from 'react-router-dom'
import  { Redirect } from 'react-router-dom';
import {
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CContainer,
	CRow,
} from '@coreui/react'

import LoginForm from './Form'

const Login = () => {

	if(localStorage.getItem('logged_user') !== null) return <Redirect to='/' />;

	return (
		<div className="c-app c-default-layout flex-row align-items-center">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md="4">
						<CCardGroup>
						<CCard className="p-4">
							<CCardBody>
								<LoginForm />
							</CCardBody>
						</CCard>
						{/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
							<CCardBody className="text-center">
							<div>
								<h2>Sign up</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
								labore et dolore magna aliqua.</p>
								<Link to="/register">
								<CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
								</Link>
							</div>
							</CCardBody>
						</CCard> */}
						</CCardGroup>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	)
}

export default Login
