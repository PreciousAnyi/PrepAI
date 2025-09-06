// app/create-interview/[id]/feedback/page.tsx

import React from 'react';
import { redirect } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
import { getCurrentUser } from '@/lib/actions/auth.action';
import FeedbackClientComponent from '@/components/FeedbackClientComponent';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const InterviewFeedbackPage = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();
  if (!user) redirect('/sign-in');

  const interview = await getInterviewById(id);
  if (!interview) redirect('/');

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id,
  });

  if (!feedback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Feedback Not Found</h2>
          <p className="text-gray-600 mb-4">No feedback available for this interview yet.</p>
        </div>
      </div>
    );
  }

  const jobRole = interview.role;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <h3 className="font-bold text-2xl">PrepAI</h3>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-bold text-center text-4xl text-gray-800 mb-8">
          Interview Feedback - {jobRole}
        </h1>

        <div className="border-b border-gray-200 mb-8" />

        <div className="max-w-6xl mx-auto">
          <FeedbackClientComponent
            type="tabs"
            feedback={feedback}
            interview={interview}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewFeedbackPage;
