import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material'
import { MuiTheme } from '@/theme'
import { Icon } from '@iconify/react'
import { axiosClient } from '@/axios/axiosClient'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên của bạn'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Vui lòng nhập nội dung câu hỏi'
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Nội dung phải có ít nhất 10 ký tự'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setSubmitStatus(null)

    try {
      await axiosClient.post('/contact', {
        name: formData.name,
        email: formData.email,
        message: formData.content,
      })

      setSubmitStatus({
        type: 'success',
        message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.',
      })

      setFormData({
        name: '',
        email: '',
        content: '',
      })
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
      <Container maxWidth="md">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: MuiTheme.palette.primary.main,
              mb: 2,
            }}
          >
            Liên Hệ Với Chúng Tôi
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              fontSize: '16px',
            }}
          >
            Hãy gửi cho chúng tôi câu hỏi, đề xuất hoặc phản hồi của bạn. Chúng tôi rất muốn nghe từ bạn!
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item size={12}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            >
              {submitStatus && (
                <Alert
                  severity={submitStatus.type}
                  sx={{ mb: 3 }}
                  onClose={() => setSubmitStatus(null)}
                >
                  {submitStatus.message}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {/* Name Field */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: '#333',
                      }}
                    >
                      Tên của bạn <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      name="name"
                      placeholder="Nhập tên của bạn"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          '&:hover fieldset': {
                            borderColor: MuiTheme.palette.primary.main,
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Email Field */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: '#333',
                      }}
                    >
                      Email <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          '&:hover fieldset': {
                            borderColor: MuiTheme.palette.primary.main,
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Message Field */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: '#333',
                      }}
                    >
                      Nội dung câu hỏi <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      name="content"
                      multiline
                      rows={6}
                      placeholder="Vui lòng nhập nội dung câu hỏi của bạn..."
                      value={formData.content}
                      onChange={handleChange}
                      error={!!errors.content}
                      helperText={errors.content}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          '&:hover fieldset': {
                            borderColor: MuiTheme.palette.primary.main,
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Submit Button */}
                  <Box sx={{ pt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        fontSize: '16px',
                        fontWeight: 600,
                        textTransform: 'none',
                        backgroundColor: MuiTheme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: MuiTheme.palette.primary.dark,
                        },
                        '&:disabled': {
                          backgroundColor: '#ccc',
                        },
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: '#fff' }} />
                      ) : (
                        'Gửi Câu Hỏi'
                      )}
                    </Button>
                  </Box>
                </Stack>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ContactPage