import { useState, useRef, useContext, FormEvent } from "react";
import { useDropzone } from "react-dropzone";
import ConnectedContext from "../../ConnectedContext";
// import useWindowSize from "../../utils/custom-hooks/useWindowSize";
import "./ProfileSettingsStyle.css";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import axios from "axios";

interface ISizes {
	original: null | number;
	resized: null | number;
}

const ProfileSettings = () => {
	// const { connectedUser, updateUser } = useContext(ConnectedContext);
	const { connectedUser} = useContext(ConnectedContext);
	// const { width, height } = useWindowSize();
	const profileSettingsRef = useRef<HTMLDivElement>(null);
	const firstnameRef = useRef<HTMLInputElement>(null);
	const lastnameRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const twoFactorRef = useRef<HTMLInputElement>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [sizes, setSizes] = useState<ISizes>({ original: null, resized: null });
	const [file, setFile] = useState<any>(null);


	const onDrop = async (acceptedFiles: File[]) => {
		const imageFile = acceptedFiles.find((file) =>
			["image/jpeg", "image/jpg", "image/png"].includes(file.type),
		);
		if (imageFile) {
			if (imageFile.size > 1024 * 1024) {
				toast.error("The size of the image should not be greater than 1MB");
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				const img: any = new Image();
				img.onload = () => {
					console.log("this is the image", img);
					if (img.width < 200 || img.height < 200) {
						toast.error(
							"Image resolution must be equal or greater than 200 x 200 pixels to resize.",
						);
						return;
					} else {
						Resizer.imageFileResizer(
							imageFile,
							500,
							500,
							"PNG",
							100,
							0,
							(resizedImage: any) => {
								setSizes((prevSizes) => ({
									...prevSizes,
									resized: resizedImage.length,
								}));
								console.log(resizedImage);
								setFile(resizedImage);
							},
							"base64",
						);
					}
				};
				img.onerror = () => {
					toast.error("Error loading image");
				};
				img.src = e.target!.result; // TODO: more checks, because you tell ts the e.target will never equal null
				console.log("this is the image source: ", img.src);
			};
			reader.readAsDataURL(imageFile);
		} else {
			toast.error("The type of image should be only jpeg, jpg or png");
			setFile(null);
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const handleFileInputChange = async (event: any) => {
		const imageFile: any = Array.from(event.target.files).find((file: any) =>
			["image/jpeg", "image/jpg", "image/png"].includes(file.type),
		);
		if (imageFile) {
			if (imageFile.size > 1024 * 1024) {
				toast.error("The size of the image should not be greater than 1MB");
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				const img: any = new Image();
				img.onload = () => {
					console.log("this is the image", img);
					if (img.width < 200 || img.height < 200) {
						toast.error(
							"Image resolution must be equal or greater than 200 x 200 pixels to resize.",
						);
						return;
					} else {
						Resizer.imageFileResizer(
							imageFile,
							500,
							500,
							"PNG",
							100,
							0,
							(resizedImage: any) => {
								setSizes((prevSizes) => ({
									...prevSizes,
									resized: resizedImage.length,
								}));
								console.log(resizedImage);
								setFile(resizedImage);
							},
							"base64",
						);
					}
				};
				img.onerror = () => {
					toast.error("Error loading image");
				};
				img.src = e.target!.result;
				console.log("this is the image source: ", img.src);
			};
			reader.readAsDataURL(imageFile);
		} else {
			toast.error("The type of image should be only jpeg, jpg or png");
			setFile(null);
		}
	};

	// useEffect(() => {
	// 	profileSettingsRef.current.style.marginTop = "5rem";
	// 	profileSettingsRef.current.style.marginBottom = `calc(100vh - ${profileSettingsRef.current.offsetHeight}px - 45.594px - 24px - 5.5rem - (1.5rem * 2))`;
	// }, [profileSettingsRef, width, height]);


	// VALIDATE DATA
  const validateName = (value: string, name: string) => {
    if(value.length === 0) {
      toast.warning(`The ${name} must not be empty`)
      return false;
    }

		if(name === 'username' && value.length > 10){
			toast.warning(`The ${name} should not be more than 10 character`);
			return false
		}

    if(value.length >= 12) {
      toast.warning(`The ${name} should not be more than 12 character`);
      return false
    }

    if(typeof value !== "string") {
      toast.warning(`The ${name} must be string`)
      return false;
    } 

    if(value.length <= 2) {
      toast.warning(`The ${name} length must be more than 2 characters`)
      return false;
    }

    return true;
  }

	const validateEmail = (value: string) => {
		console.log('email value is: ', value)
		if(value.length === 0) {
			toast.warning('The email must not be empty');
			return false;
		}
	
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if(!emailRegex.test(value)) {
			toast.warning('The email is not valid');
			return false;
		}
	
		return true;
	}

	// HANDLE THE SUBMIT
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if(firstnameRef?.current && lastnameRef?.current && emailRef?.current && usernameRef?.current){
			if(!validateName(firstnameRef?.current.value, 'firstname') || !validateName(lastnameRef?.current.value, 'lastname') || !validateName(usernameRef?.current.value, 'username') || !validateEmail(emailRef?.current.value)) return;
		console.log(usernameRef.current.value)

		// Convert base64 string to binary data
		let blob: any = null;
		if (file) {
			const binaryData = atob(file.split(',')[1]);
			const arrayBuffer = new ArrayBuffer(binaryData.length);
			const uint8Array = new Uint8Array(arrayBuffer);
			for (let i = 0; i < binaryData.length; i++) {
				uint8Array[i] = binaryData.charCodeAt(i);
			}
		
			// Create a Blob from binary data
			blob = new Blob([uint8Array], { type: 'image/png' });
		}
		
	
		const formData = new FormData();
		formData.append('file', blob);
		formData.append("fullname", firstnameRef.current.value + ' ' +lastnameRef.current.value);
		formData.append("username", usernameRef.current.value);
		formData.append("email", emailRef.current.value);
		formData.append("id", connectedUser?.id);
		if (twoFactorRef.current) {
			formData.append("twoFactor", twoFactorRef.current.checked.toString());
		} else {
			formData.append("twoFactor", 'false');
		}
	
		try {
			const response = await axios.post('http://localhost:3001/match/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log(response.data);
			toast.success('The informations has been updated successfully.');
		} catch (error) {
			toast.warning('Failed to update informations.');
		}
	}
	};




	return (
		<div ref={profileSettingsRef} className="profile-settings container">
			{/* 4.375 */}
			<div className="profile-settings-content">
				<div className="profile-settings-header">
					<div className="profile-settings-title">Profile Settings</div>
				</div>
					<div className="profile-settings-body">
						<form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
							<div className="profile-image-section">
								<img
									ref={imgRef}
									className="user-avatar"
									src={
										file
											? file
											: `${process.env.PUBLIC_URL}/images/uploads/default-avatar.png`
									}
									alt="Uploaded"
								/>
								<div {...getRootProps()}>
									<input {...getInputProps()} type="file" name="file"  onChange={handleFileInputChange} />
									{isDragActive ? (
										<p className="dropzone-field">Drop the image here ...</p>
									) : (
										<p className="dropzone-field">
											Drag and drop an image or, or click to select a file
										</p>
									)}
								</div>
							</div>
							<div className="profile-inputs-section">
								<div className="form-inputs">
									<div className="form-control">
										<label htmlFor="user-firstname">Firstname</label>
										<input
											id="user-firstname"
											ref={firstnameRef}
											type="text"
											className="user-firstname"
											defaultValue={`${connectedUser?.fullname?.split(' ')[0]}`}
										/>
									</div>
								</div>
								<div className="form-inputs">
									<div className="form-control">
										<label htmlFor="user-lastname">Lastname</label>
										<input
											id="user-lastname"
											ref={lastnameRef}
											type="text"
											className="user-lastname"
											defaultValue={`${connectedUser?.fullname?.split(' ')[1]}`}
										/>
									</div>
								</div>
								<div className="form-inputs">
									<div className="form-control">
										<label htmlFor="user-username">username</label>
										<input
											id="user-username"
											ref={usernameRef}
											type="text"
											className="user-username"
											defaultValue={`${connectedUser.username}`}
										/>
									</div>
								</div>
								<div className="form-inputs">
									<div className="form-control">
										<label htmlFor="user-email">email</label>
										<input
											id="user-email"
											ref={emailRef}
											type="email"
											className="user-email"
											defaultValue={`${connectedUser.email}`}
										/>
									</div>
								</div>
								<div className="form-inputs">
									<input
										id="active-2fa"
										ref={twoFactorRef}
										type="checkbox"
										className="active-2fa"
										defaultChecked={connectedUser?.is_2fa}
									/>
									<label htmlFor="active-2fa">Activate Two Factor(2FA)</label>
								</div>
								<div className="actions-buttons">
									<input
										className="action-button button-active"
										type="submit"
										value="Save Changes"
									/>
								</div>
							</div>
						</form>
					</div>
			</div>
		</div>
	);
};

export default ProfileSettings;
