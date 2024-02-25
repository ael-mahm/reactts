import React, { useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./TwoFactorFormStyle.css";

const TwoFactorForm: React.FC = () => {
	const inputs = useRef<HTMLInputElement[]>([]);

	useEffect(() => {
		inputs?.current.forEach((input, index) => {
			if (index === 0) input.focus();
			input.addEventListener("keydown", handleKeyDown);
			input.addEventListener("paste", handlePaste);
		});

		return () => {
			inputs?.current.forEach((input) => {
				input.removeEventListener("keydown", handleKeyDown);
				input.removeEventListener("paste", handlePaste);
			});
		};
	}, []);

	const handleKeyDown = (e:any) => {
		const input = e.target;
		const key = e.key;

		if (!isConnectedInput(input)) return;

		switch (key) {
			case "ArrowLeft":
				if (input?.selectionStart === 0 && input?.selectionEnd === 0) {
					const previous = input?.previousElementSibling;
					if (previous === null) return;
					previous.focus();
					previous.selectionStart = previous.value.length - 1;
					previous.selectionEnd = previous.value.length - 1;
					e.preventDefault();
				}
				break;

			case "ArrowRight":
				if (
					input?.selectionStart === input?.value.length &&
					input?.selectionEnd === input?.value.length
				) {
					const next = input?.nextElementSibling;
					if (next === null) return;
					next.focus();
					next.selectionStart = 1;
					next.selectionEnd = 1;
					e.preventDefault();
				}
				break;

			case "Delete":
				if (
					input?.selectionStart === input?.value.length &&
					input?.selectionEnd === input?.value.length
				) {
					const next = input?.nextElementSibling;
					if (next === null) return;
					next.value = next?.value.substring(1, next?.value.length);
					next.focus();
					next.selectionStart = 0;
					next.selectionEnd = 0;
					e.preventDefault();
				}
				break;

			case "Backspace":
				if (input?.selectionStart === 0 && input?.selectionEnd === 0) {
					const previous = input?.previousElementSibling;
					if (previous === null) return;
					previous.value = previous?.value.substring(
						0,
						previous?.value.length - 1,
					);
					previous?.focus();
					previous.selectionStart = previous?.value.length;
					previous.selectionEnd = previous?.value.length;
					e.preventDefault();
				}
				break;
			default:
				if (e.ctrlKey || e.altKey) return;

				if (key?.length > 1) return;

				if (key?.match(/^[^0-9]$/)) return e.preventDefault();

				e.preventDefault();

				onInputChange(input, key);

				break;
		}
	};

	const handlePaste = (e:any) => {
		const input = e.target;
		const data = e.clipboardData.getData("text");

		if (!isConnectedInput(input)) return;

		if (!data.match(/^[0-9]+$/)) return e.preventDefault();

		e.preventDefault();

		onInputChange(input, data);
	};

	const isConnectedInput = (input:any) => {
		const parent = input?.closest("[data-connected-inputs]");
		return input?.matches("input") && parent != null;
	};

	const onInputChange = (input: any, newValue: any) => {
		const start = input?.selectionStart;
		const end = input?.selectionEnd;

		updateInputValue(input, newValue, start, end);

		focusInput(input, newValue.length + start);
	};

	const updateInputValue = (input: any, extraValue:any, start = 0, end = 0) => {
		const newValue = `${input?.value.substring(
			0,
			start,
		)}${extraValue}${input?.value.substring(end, 1)}`;

		input.value = newValue?.substring(0, 1);

		if (newValue?.length > 1) {
			console.log(newValue);
			const next = input?.nextElementSibling;

			if (next === null) return;

			updateInputValue(next, newValue.substring(1));
		}
	};

	const focusInput = (input: any, dataLength: any) => {
		let addedCharacters = dataLength;
		let currentInput = input;

		while (addedCharacters > 1 && currentInput?.nextElementSibling != null) {
			addedCharacters -= 1;
			currentInput = currentInput?.nextElementSibling;
		}

		if (addedCharacters > 1) addedCharacters = 1;

		currentInput?.focus();
		currentInput.selectionStart = addedCharacters;
		currentInput.selectionEnd = addedCharacters;
	};

	const handleSubmit = () => {
		const number = inputs?.current.reduce(
			(acc, input) => acc + input.value,
			"",
		);

		if (number.length < 6) {
			toast.warning(
				"The two factor validation code length must be 6 characters",
			);
		} else {
			console.log(number);
			if (parseInt(number) === 123456) {
				toast.success(
					"Your two-factor authentication has been successfully verified",
				);
			} else {
				toast.warning("Your two-factor authentication code is not correct");
			}
		}
	};

	return (
		<section className="two-factor-form">
			<div className="two-factor-inputs" data-connected-inputs>
				{[...Array(6)].map((_, index) => (
					<input
						key={`key-${index}`}
						maxLength={1}
						type="text"
						ref={(el: any) => (inputs.current[index] = el)}
						className="two-factor-input"
					/>
				))}
			</div>
			<div className="actions-buttons">
				<input
					className="action-button button-active"
					type="submit"
					value="Submit"
					onClick={() => handleSubmit()}
				/>
			</div>
		</section>
	);
};

export default TwoFactorForm;
