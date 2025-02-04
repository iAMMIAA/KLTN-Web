import './css/PopupPost.css';
import './css/Exchange.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Avatar } from '@mui/material';
import {Controller, useForm, FormProvider} from "react-hook-form"
import {useEffect, useMemo} from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import LoadingButton from '@mui/lab/LoadingButton';
import { useDarkMode } from './DarkModeContext';

export default function PostPopup(props) {
  const {darkMode} = useDarkMode();
  const schema = yup
    .object({
      content: yup.string().required('Nội dung không được để trống'),
    })
    .required()

  const defaultValues = useMemo(
    () => ({
      content: '',
    }),
    []
  );

  useEffect(() => {
    if (props.open) {
      methods.reset(defaultValues);
    }
    // eslint-disable-next-line
  }, [props.open])

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await props.createExchange(data.content);
      props.onClose();
    } catch (e) {console.error(e)}
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
    >
      <DialogTitle className={`popupPost ${darkMode ? 'dark_mode':''}`}>
        <div className='title-post'>Tạo bài viết </div>
      </DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className='popupPost'>
            <div className='post-user'>
              <Avatar />
              <div className='post-user-info'>
                <div className='post-user-name'>{props.inforUser.username}</div>
              </div>
            </div>

            <div className='post-content'>
              <Controller
                name='content'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={5}
                    fullWidth
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
                    error={!!error}
                    helperText={error ? error?.message : ''}
                  />
                )}
              />
            </div>

          </DialogContent>
          <DialogActions className='popupPost'>
            <Button onClick={props.onClose}>Cancel</Button>
            <LoadingButton loading={isSubmitting} type="submit">Post</LoadingButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}