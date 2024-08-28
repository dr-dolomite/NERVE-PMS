import React from 'react'

interface PatientFollowupFormProps {
  onSuccess?: () => void;
  patientId: string;
}

const PatientFollowupForm = ( { onSuccess, patientId } : PatientFollowupFormProps) => {
  return (
    <div>PatientFollowupForm</div>
  )
}

export default PatientFollowupForm