import React, { FormEvent, MouseEvent } from 'react';
import './index.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import useInputManager from '../../../../utils/useInputManager';
import uploadImage from '../../../../utils/cloudinary';
import { updateCoacheBanniere } from '../../../../store/reducers/coaches';

function ProfileBanniereSection() {
  const dispatch = useAppDispatch();
  const userCoache = useAppSelector((state) => state.coaches.user);
  const {
    logo,
    banniere,
  } = userCoache;
  const {
    preview,
    getRootProps,
    getInputProps,
    isDragActive,
    createFormData,
  } = useInputManager();
  const formHandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = createFormData();
    if (!formData) return;
    try {
      const labanniere = await uploadImage(formData);
      await dispatch(updateCoacheBanniere({ labanniere }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during form submission:', error);
    }

    // updateCoacheBanniere
  };

  return (
    <div className="profile-section">
      <div className="titleProfilePictureSection">

        <h3>Photo de la banniere</h3>
      </div>

      <div className="profile-image">
        <img src={banniere} alt="" srcSet="" />

      </div>
      <form onSubmit={formHandleSubmit}>
        <div className="file-input-section">
          <div className="dashed-box">
            <div className="flex flex-col items-center">
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
                <g fill="currentColor">
                  <path d="M22 14v-2.202l-.002-1.048L22 10H2v4c0 3.771 0 5.657 1.172 6.828C4.343 22 6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.172C22 19.657 22 17.771 22 14Z" />
                  <path d="m11 4l-.55-.55c-.274-.274-.41-.41-.554-.53a4 4 0 0 0-2.18-.903C7.53 2 7.336 2 6.95 2c-.883 0-1.324 0-1.692.07A4 4 0 0 0 2.07 5.257C2 5.626 2 6.068 2 6.95V10h20l-.047-.75c-.072-1.049-.256-1.737-.723-2.256a2.984 2.984 0 0 0-.224-.225C20.151 6 18.834 6 16.202 6h-.374c-1.153 0-1.73 0-2.268-.153a4 4 0 0 1-.848-.352C12.224 5.224 11.816 4.815 11 4Z" opacity=".5" />
                </g>
              </svg> */}
            </div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive
                ? <p>Déposez les fichiers ici...</p>
                : (
                  <p>
                    Faites glisser et déposez fichiers ici
                    <br />
                    {' '}
                    ou cliquez pour sélectionner des fichiers
                  </p>
                )}
            </div>
            <img src={preview} alt="" />
          </div>
        </div>
        <div className="my-form--button">
          <button type="submit">
            Valider
          </button>
        </div>

      </form>
    </div>
  );
}

export default ProfileBanniereSection;
