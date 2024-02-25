import React from 'react';
import TwoFactorForm from "./two-factor-form/TwoFactorForm";
import "./TwoFactorValidation.css";

const TwoFactorValidation: React.FC = () => {
	return (
		<section className="two-factor-validation-section container">
			<div className="two-factor-validation-content">
				<div className="two-factor-validation-header">
					<div className="two-factor-validation-title">
						Two Factor Validation
					</div>
				</div>
				<div className="two-factor-validation-body">
					<div className="qr-code-image">
						<img src={process.env.PUBLIC_URL + "/images/qr-code.png"} alt="QR code" />
					</div>
					<TwoFactorForm />
				</div>
			</div>
		</section>
	);
};

export default TwoFactorValidation;
