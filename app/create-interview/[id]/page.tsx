import Agent from '@/components/Agent';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }: RouteParams) => {
    const { id } = await params;
  
    const user = await getCurrentUser();
  
    const interview = await getInterviewById(id);
    if (!interview) redirect("/");
  
    const feedback = await getFeedbackByInterviewId({
      interviewId: id,
      userId: user?.id!,
    });
  return (
    <>
      <Agent
        userName={user?.name ?? "There"}
        userId={user?.id}
        interviewType={interview.type}
        interviewLevel={interview.level}
        interviewRole={interview.role}
        questions={interview.questions}
        interviewId={interview.id}
        profileImageUrl={user?.profileImageUrl ?? "/profile.png"}
        type="interview"
      />
    </>
  )
}

export default page