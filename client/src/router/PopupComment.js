import * as React from 'react';
import {useEffect, useMemo} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './css/PopupComment.css';
import './css/Exchange.css';
import TextField from "@mui/material/TextField";
import {Avatar, Stack} from "@mui/material";
import {Controller, FormProvider, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {createComment, useCountComment, useGetCommentList} from "../api/exchange.api";
import { useDarkMode } from './DarkModeContext';

export default function CommentPopup(props) {
  const {darkMode} = useDarkMode();
  const {data: comments, mutate} = useGetCommentList(props.exchangeId)
  const {mutate: mutateCountComment} = useCountComment();

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
  }, [props.open])

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const {
    control,
    handleSubmit,
    formState: {isSubmitting, isDirty},
    reset,
  } = methods;

  const onSubmit = async (data) => {
    try {
      await mutate(
        createComment(props.exchangeId, data.content),
        {
          populateCache: (comment) => {
            return [
              ...comments,
              comment.data
            ]
          },
          revalidate: false
        }
      )
      reset(defaultValues);
      await mutateCountComment();
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth={'md'}
    >
      <DialogTitle  className={`popupComment ${darkMode ? 'dark_mode':''}`}>
        <div className='title-post-comment'>Bình luận</div>
      </DialogTitle>
      <DialogContent className='popupComment'>
        <Stack spacing={3}>
          {comments && comments.map((comment, key) => (
            <Stack direction="row" spacing={2} alignItems={'center'} key={key}>
              <Avatar alt={comment?.user?.username || ''} src={comment?.user?.username || ''} />
              <Stack>
                <div style={{fontWeight: 'bold'}}>{comment?.user?.username || ''}</div>
                <div>{comment.contentComment}</div>
              </Stack>
            </Stack>
          ))}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='content'
                control={control}
                render={({field, fieldState: {error}}) => (
                  <TextField 
                    {...field}
                    multiline
                    rows={1}
                    fullWidth
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
                    error={!!error}
                    helperText={error ? error?.message : ''}
                  />
                )}
              />
              <DialogActions>
                <Button onClick={props.onClose}>Hủy</Button>
                <Button type='submit' disabled={isSubmitting || !isDirty}>Gửi</Button>
              </DialogActions>
            </form>
          </FormProvider>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}