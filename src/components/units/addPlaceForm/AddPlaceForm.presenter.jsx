import * as S from './AddPlaceForm.styles';
import { Controller } from 'react-hook-form';
export default function AddPlaceFormUI(props) {
  return (
    <S.FormWrapper onSubmit={props.handleSubmit(props.onSubmit)}>
      <S.InputWrapper>
        <S.InputLabel>Category</S.InputLabel>
        <S.Input
          {...props.register('placeCategory')}
          defaultValue={props.placeCategory}
          disabled
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>Place Name</S.InputLabel>
        <S.Input
          {...props.register('placeName')}
          defaultValue={props.placeName}
          disabled
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>Place Address</S.InputLabel>
        <S.Input
          {...props.register('placeAddress')}
          defaultValue={props.placeAddress}
          disabled
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>English Description</S.InputLabel>
        <S.Input
          {...props.register('placeDescription')}
          placeholder="Write brief summary of the place"
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.FileLabel htmlFor="placeImage">Signboard Image</S.FileLabel>
        <S.FileInput
          id="placeImage"
          type="file"
          accept="image/*"
          onChange={props.handleFileChange}
        />
        {props.preview && <S.Preview src={props.preview} alt="preview" />}
      </S.InputWrapper>

      <S.OptionWrapper>
        <Controller
          control={props.control}
          name="hasKiosk"
          render={({ field }) => (
            <S.OptionLabel
              onClick={() => field.onChange(!field.value)}
              style={{
                border: field.value
                  ? '2.5px solid #2b2144'
                  : '1px solid #e4e0f0',
              }}
            >
              Kiosk
            </S.OptionLabel>
          )}
        />

        <Controller
          control={props.control}
          name="hasParking"
          render={({ field }) => (
            <S.OptionLabel
              onClick={() => field.onChange(!field.value)}
              style={{
                border: field.value
                  ? '2.5px solid #2b2144'
                  : '1px solid #e4e0f0',
              }}
            >
              Parking
            </S.OptionLabel>
          )}
        />

        <Controller
          control={props.control}
          name="englishAvailable"
          render={({ field }) => (
            <S.OptionLabel
              onClick={() => field.onChange(!field.value)}
              style={{
                border: field.value
                  ? '2.5px solid #2b2144'
                  : '1px solid #e4e0f0',
              }}
            >
              English
            </S.OptionLabel>
          )}
        />

        <Controller
          control={props.control}
          name="wifiAvailable"
          render={({ field }) => (
            <S.OptionLabel
              onClick={() => field.onChange(!field.value)}
              style={{
                border: field.value
                  ? '2.5px solid #2b2144'
                  : '1px solid #e4e0f0',
              }}
            >
              Wifi
            </S.OptionLabel>
          )}
        />
      </S.OptionWrapper>
      <S.SubmitButton type="submit">Submit</S.SubmitButton>
    </S.FormWrapper>
  );
}
