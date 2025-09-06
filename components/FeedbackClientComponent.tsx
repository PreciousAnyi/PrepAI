'use client';

import React, { useState } from 'react';
import { 
  Share2, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  User, 
  Award, 
  Star,
  LucideIcon,
  Clock,
  Calendar
} from 'lucide-react';

// Component Props Interfaces
interface FeedbackCardProps {
  totalScore: number;
  verdict: string;
  type: string;
  role: string;
  date: string;
  time: string;
}

interface CategoryScoreProps {
  title: string;
  score: number;
  icon: LucideIcon;
  description?: string;
}

interface FeedbackListProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  type?: 'positive' | 'improvement';
}

interface FeedbackClientComponentProps {
  type: string;
  feedback: any; // Using 'any' for simplicity, should be a more specific type
  interview: any; // Using 'any' for simplicity
}

const FeedbackClientComponent: React.FC<FeedbackClientComponentProps> = ({ 
  type, 
  feedback, 
  interview
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');

  const getVerdict = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 60) return 'Promising';
    return 'Needs Improvement';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const categoryMapping = {
    'Communication Skills': { icon: TrendingUp, description: 'Clarity, articulation, and structured responses' },
    'Technical Knowledge': { icon: User, description: 'Understanding of key concepts for the role' },
    'Problem-Solving': { icon: Award, description: 'Ability to analyze problems and propose solutions' },
    'Cultural & Role Fit': { icon: Star, description: 'Alignment with company values and job role' },
    'Confidence & Clarity': { icon: CheckCircle, description: 'Confidence in responses and engagement' }
  };

  const handleShare = (): void => {
    try {
      const el = document.createElement('textarea');
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      console.log("Link copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy link:', err);
      console.error("Failed to copy link");
    }
  };

  const handleExportPDF = (): void => {
    console.log("Exporting to PDF...");
    console.log("PDF export functionality would be implemented here");
  };

  const handleSendEmail = (): void => {
    if (!feedback || !interview || !getVerdict) return;
    
    const jobRole = interview.jobRole || interview.role;
    const subject = `Interview Feedback - ${jobRole}`;
    const body = `Your interview feedback is ready. Overall score: ${feedback.totalScore}/100 (${getVerdict(feedback.totalScore)})`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  // FeedbackCard Component
  const FeedbackCard: React.FC<FeedbackCardProps> = ({ totalScore, verdict, type, role, date, time }) => {
    const getScoreColor = (score: number): string => {
      if (score >= 80) return 'text-green-500';
      if (score >= 60) return 'text-yellow-500';
      return 'text-red-500';
    };

    const getVerdictColor = (verdict: string): string => {
      switch (verdict.toLowerCase()) {
        case 'excellent': return 'bg-green-100 text-green-800';
        case 'good': return 'bg-blue-100 text-blue-800';
        case 'promising': return 'bg-yellow-100 text-yellow-800';
        case 'needs improvement': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-gray-600">{type} Interview</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getVerdictColor(verdict)}`}>
            {verdict}
          </span>
        </div>
        
        <div className="text-center mb-4">
          <div className={`text-4xl font-bold ${getScoreColor(totalScore)} mb-2`}>
            {totalScore}/100
          </div>
          <div className="text-lg font-semibold text-gray-800">{role}</div>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    );
  };
  
  // Category Score Component
  const CategoryScore: React.FC<CategoryScoreProps> = ({ title, score, icon: Icon, description }) => {
    const getScoreColor = (score: number): string => {
      if (score >= 80) return 'text-green-500';
      if (score >= 60) return 'text-yellow-500';
      return 'text-red-500';
    };

    const getProgressColor = (score: number): string => {
      if (score >= 80) return 'bg-green-500';
      if (score >= 60) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold text-lg text-blue-500">{title}</h3>
          </div>
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}/100</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className={`h-2 rounded-full ${getProgressColor(score)}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
    );
  };
  
  // List Component for Strengths/Improvements
  const FeedbackList: React.FC<FeedbackListProps> = ({ title, items, icon: Icon, type = 'positive' }) => {
    const iconColor = type === 'positive' ? 'text-green-500' : 'text-orange-500';
    const ItemIcon = type === 'positive' ? CheckCircle : AlertCircle;

    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h3 className="font-semibold text-lg mb-4 flex items-center text-red-300">
          <Icon className={`w-6 h-6 ${iconColor} mr-2`} />
          {title}
        </h3>
        <ul className="space-y-3">
          {items.map((item: string, index: number) => (
            <li key={index} className="flex items-start space-x-3">
              <ItemIcon className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0`} />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  // Share button
  if (type === 'share') {
    return (
      <button
        onClick={handleShare}
        className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>
    );
  }

  // Export button
  if (type === 'export') {
    return (
      <button
        onClick={handleExportPDF}
        className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Download className="w-4 h-4" />
        <span>Export PDF</span>
      </button>
    );
  }

  // Tabs and content
  if (type === 'tabs' && feedback && interview) {
    const jobRole = interview.jobRole || interview.role;

    return (
      <>
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          {[
            { id: 'overview' as const, label: 'Overview' },
            { id: 'detailed' as const, label: 'Detailed Analysis' },
            { id: 'recommendations' as const, label: 'Assessment' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Feedback Card */}
            <div className="flex justify-center">
              <FeedbackCard
                totalScore={feedback.totalScore}
                verdict={getVerdict(feedback.totalScore)}
                type="Mock"
                role={jobRole}
                date={formatDate(feedback.createdAt)}
                time={formatTime(feedback.createdAt)}
              />
            </div>

            {/* Quick Stats - Category Averages */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedback.categoryScores.map((category: { name: string; score: number; comment: string }, index: number) => {
                const mapping = categoryMapping[category.name] || { icon: () => null, description: '' };
                const IconComponent = mapping.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 border text-center">
                    <IconComponent className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{category.score}/100</div>
                    <div className="text-gray-600 text-sm">{category.name}</div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleSendEmail}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Send via Email
              </button>
              <button
                onClick={() => setActiveTab('detailed')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Detailed Analysis
              </button>
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-6">
            {/* Category Scores */}
            {feedback.categoryScores.map((category: { name: string; score: number; comment: string }, index: number) => {
              const mapping = categoryMapping[category.name] || { icon: () => null, description: '' };
              return (
                <CategoryScore
                  key={index}
                  title={category.name}
                  score={category.score}
                  icon={mapping.icon}
                  description={mapping.description}
                />
              );
            })}

            {/* Category Comments */}
            {feedback.categoryScores.some((cat: { comment: string }) => cat.comment) && (
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="font-semibold text-lg mb-4 flex items-center text-blue-500">
                  <span className="w-6 h-6 text-blue-500 mr-2">⭐</span>
                  Category Comments
                </h3>
                <div className="space-y-4">
                  {feedback.categoryScores
                    .filter((cat: { comment: string }) => cat.comment)
                    .map((category: { name: string; comment: string }, index: number) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-gray-800">{category.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{category.comment}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Strengths and Areas for Improvement */}
            <div className="grid md:grid-cols-2 gap-6">
              {feedback.strengths && feedback.strengths.length > 0 && (
                <FeedbackList
                  title="Key Strengths"
                  items={feedback.strengths}
                  icon={CheckCircle}
                  type="positive"
                />
              )}
              
              {feedback.areasForImprovement && feedback.areasForImprovement.length > 0 && (
                <FeedbackList
                  title="Areas for Improvement"
                  items={feedback.areasForImprovement}
                  icon={AlertCircle}
                  type="improvement"
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            {/* Final Assessment */}
            {feedback.finalAssessment && (
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="font-semibold text-lg mb-4 flex items-center text-blue-500">
                  <span className="w-6 h-6 text-purple-500 mr-2">🏆</span>
                  Final Assessment
                </h3>
                <p className="text-gray-700 leading-relaxed">{feedback.finalAssessment}</p>
              </div>
            )}

            {/* Overall Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Interview Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Interview Date:</span>
                  <span className="ml-2 text-gray-800">{formatDate(feedback.createdAt)}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Job Role:</span>
                  <span className="ml-2 text-gray-800">{jobRole}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Overall Score:</span>
                  <span className="ml-2 text-gray-800 font-semibold">{feedback.totalScore}/100</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Assessment:</span>
                  <span className="ml-2 text-gray-800">{getVerdict(feedback.totalScore)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export default FeedbackClientComponent;
