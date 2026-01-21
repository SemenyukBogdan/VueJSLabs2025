<template>
  <div class="page">
    <h1>{{ t('profile.title') }}</h1>
    
    <form @submit.prevent="handleSubmit" class="profile-form">
      <!-- Поле імені -->
      <div class="form-group">
        <label for="name">{{ t('profile.name') }}:</label>
        <input
          id="name"
          v-model="nameValue"
          @input="nameHandleChange"
          @blur="nameHandleBlur"
          type="text"
          class="form-input"
          :class="{ 'error': nameMeta.touched && nameMeta.valid === false }"
        />
        <span v-if="nameMeta.touched && nameMeta.valid === false" class="error-message">
          {{ nameErrorMessage }}
        </span>
      </div>

      <!-- Поле email -->
      <div class="form-group">
        <label for="email">{{ t('profile.email') }}:</label>
        <input
          id="email"
          v-model="emailValue"
          @input="emailHandleChange"
          @blur="emailHandleBlur"
          type="email"
          class="form-input"
          :class="{ 'error': emailMeta.touched && emailMeta.valid === false }"
        />
        <span v-if="emailMeta.touched && emailMeta.valid === false" class="error-message">
          {{ emailErrorMessage }}
        </span>
      </div>

      <!-- Поле дати народження -->
      <div class="form-group">
        <label for="dateOfBirth">{{ t('profile.dateOfBirth') }}:</label>
        <input
          id="dateOfBirth"
          v-model="dateOfBirthValue"
          @input="dateOfBirthHandleChange"
          @blur="dateOfBirthHandleBlur"
          type="date"
          class="form-input"
          :class="{ 'error': dateOfBirthMeta.touched && dateOfBirthMeta.valid === false }"
        />
        <span v-if="dateOfBirthMeta.touched && dateOfBirthMeta.valid === false" class="error-message">
          {{ dateOfBirthErrorMessage }}
        </span>
      </div>

      <!-- Поле адреси -->
      <div class="form-group">
        <label for="address">{{ t('profile.address') }}:</label>
        <input
          id="address"
          v-model="addressValue"
          @input="addressHandleChange"
          @blur="addressHandleBlur"
          type="text"
          class="form-input"
          :class="{ 'error': addressMeta.touched && addressMeta.valid === false }"
        />
        <span v-if="addressMeta.touched && addressMeta.valid === false" class="error-message">
          {{ addressErrorMessage }}
        </span>
      </div>

      <!-- Масив телефонів -->
      <div class="form-group">
        <label>{{ t('profile.phones') }}:</label>
        <div 
          v-for="(field, index) in phoneFields" 
          :key="field.key" 
          class="phone-field-group"
        >
          <input
            v-model="values.phones[index]"
            type="tel"
            class="form-input phone-input"
            :class="{ 'error': getPhoneError(index) }"
            :placeholder="t('profile.phonePlaceholder')"
          />
          <button
            type="button"
            @click="removePhone(index)"
            class="remove-phone-btn"
            :disabled="phoneFields.length === 1"
          >
            {{ t('common.remove') }}
          </button>
          <span 
            v-if="getPhoneError(index)" 
            class="error-message"
          >
            {{ getPhoneError(index) }}
          </span>
        </div>
        <button
          type="button"
          @click="addPhone"
          class="add-phone-btn"
        >
          {{ t('profile.addPhone') }}
        </button>
      </div>

      <!-- Кнопки дій -->
      <div class="form-actions">
        <button type="submit" class="submit-btn">
          {{ t('common.save') }}
        </button>
        <button type="button" @click="handleReset" class="reset-btn">
          {{ t('common.reset') }}
        </button>
        <button 
          type="button" 
          @click="emulateServerError" 
          class="error-btn"
        >
          {{ t('profile.serverErrorExample') }}
        </button>
      </div>

      <!-- Повідомлення про успіх -->
      <div v-if="submitSuccess" class="success-message">
        {{ t('profile.successMessage') }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useForm, useField, useFieldArray } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()

// Схема валідації з Yup
const validationSchema = yup.object({
  name: yup
    .string()
    .required('required')
    .min(2, 'min')
    .label(t('profile.name')),
  email: yup
    .string()
    .required('required')
    .email('email')
    .label(t('profile.email')),
  dateOfBirth: yup
    .date()
    .required('required')
    .max(new Date(), 'date')
    .label(t('profile.dateOfBirth')),
  address: yup
    .string()
    .label(t('profile.address')),
  phones: yup
    .array()
    .of(
      yup.string().matches(/^\+?[0-9]{10,15}$/, 'phone')
    )
    .min(1, 'required')
    .label(t('profile.phones'))
})

// Ініціалізація форми
const { handleSubmit: onSubmit, resetForm, setFieldError, errors, values } = useForm({
  validationSchema,
  initialValues: {
    name: '',
    email: '',
    dateOfBirth: '',
    address: '',
    phones: ['']
  }
})

const handleReset = () => {
  resetForm()
}

// Поля форми
const { value: nameValue, handleChange: nameHandleChange, handleBlur: nameHandleBlur, meta: nameMeta, errors: nameErrors } = useField('name')
const nameErrorMessage = computed(() => {
  if (nameErrors.value.length > 0) {
    const errorKey = nameErrors.value[0]
    return t(`errors.${errorKey}`, { field: t('profile.name'), min: 2 })
  }
  return ''
})

const { value: emailValue, handleChange: emailHandleChange, handleBlur: emailHandleBlur, meta: emailMeta, errors: emailErrors } = useField('email')
const emailErrorMessage = computed(() => {
  if (emailErrors.value.length > 0) {
    const errorKey = emailErrors.value[0]
    return t(`errors.${errorKey}`, { field: t('profile.email') })
  }
  return ''
})

const { value: dateOfBirthValue, handleChange: dateOfBirthHandleChange, handleBlur: dateOfBirthHandleBlur, meta: dateOfBirthMeta, errors: dateOfBirthErrors } = useField('dateOfBirth')
const dateOfBirthErrorMessage = computed(() => {
  if (dateOfBirthErrors.value.length > 0) {
    const errorKey = dateOfBirthErrors.value[0]
    return t(`errors.${errorKey}`, { field: t('profile.dateOfBirth') })
  }
  return ''
})

const { value: addressValue, handleChange: addressHandleChange, handleBlur: addressHandleBlur, meta: addressMeta, errors: addressErrors } = useField('address')
const addressErrorMessage = computed(() => {
  if (addressErrors.value.length > 0) {
    const errorKey = addressErrors.value[0]
    return t(`errors.${errorKey}`, { field: t('profile.address') })
  }
  return ''
})

// Масив телефонів
const { fields: phoneFields, push: addPhoneField, remove: removePhoneField } = useFieldArray('phones')

const addPhone = () => {
  addPhoneField('')
}

const removePhone = (index: number) => {
  if (phoneFields.value.length > 1) {
    removePhoneField(index)
  }
}

const getPhoneError = (index: number): string => {
  const phoneErrors = errors.value.phones
  if (!phoneErrors || !Array.isArray(phoneErrors) || !phoneErrors[index]) {
    return ''
  }
  const error = phoneErrors[index]
  if (typeof error === 'string') {
    return t(`errors.${error}`, { field: t('profile.phones') })
  }
  return ''
}

// Обробка відправки форми
const submitSuccess = ref(false)

const handleSubmit = onSubmit((values) => {
  console.log('Form submitted:', values)
  submitSuccess.value = true
  setTimeout(() => {
    submitSuccess.value = false
  }, 3000)
})

// Емуляція помилки сервера
const emulateServerError = () => {
  setFieldError('email', t('errors.serverError'))
}
</script>

<style scoped>
.page {
  padding: 2rem;
  max-width: 600px;
}

.profile-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #e0e0e0;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

.form-input.error {
  border-color: #dc3545;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  color: #dc3545;
  font-size: 0.875rem;
}

.phone-field-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: flex-start;
}

.phone-input {
  flex: 1;
}

.remove-phone-btn {
  padding: 0.75rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.remove-phone-btn:hover:not(:disabled) {
  background-color: #c82333;
}

.remove-phone-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-phone-btn {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-phone-btn:hover {
  background-color: #5a6268;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.submit-btn,
.reset-btn,
.error-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn {
  background-color: #42b883;
  color: white;
}

.submit-btn:hover {
  background-color: #35a372;
}

.reset-btn {
  background-color: #6c757d;
  color: white;
}

.reset-btn:hover {
  background-color: #5a6268;
}

.error-btn {
  background-color: #ffc107;
  color: #333;
}

.error-btn:hover {
  background-color: #e0a800;
}

.success-message {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #d4edda;
  color: #155724;
  border-radius: 6px;
  border: 1px solid #c3e6cb;
}
</style>

