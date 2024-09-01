import FollowUpPlanPage from '@/components/follow-up-plan'
import React from 'react'

const PlanInputPage = async ({ params } : { params: { planType: string }}) => {

    const planType = params.planType

    if (planType == "follow-up") {
        return (
            <FollowUpPlanPage />
        )
    }

    if (planType == "opd") {
        return (
            <div>OPDPlanPage</div>
        )
    }

    if (planType == "admit") {
        return (
            <div>AdmitPlanPage</div>
        )
    }

    if (planType == "referral") {
        return (
            <div>ReferralPlanPage</div>
        )
    }

    return (
        <div>Invalid Plan Type</div>
    )
}

export default PlanInputPage