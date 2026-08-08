import React from "react";
import { Sparkles, Calendar, FileText, Mail, Bookmark, Users, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export const EMAIL_TEMPLATES = [
  {
    id: "announcement",
    name: "Announcement",
    icon: Sparkles,
    subject: "📢 Important Announcement — IEEE Beni Suef Student Branch",
    body: "Dear IEEE Members,\n\nWe are excited to share an important announcement regarding our upcoming branch activities and upcoming opportunities!\n\nPlease stay tuned for detailed instructions and schedules.\n\nBest regards,\nIEEE BSB Executive Board",
  },
  {
    id: "meeting_reminder",
    name: "Meeting Reminder",
    icon: Calendar,
    subject: "📅 Meeting Reminder — IEEE General Assembly",
    body: "Dear Member,\n\nThis is a friendly reminder for our upcoming meeting scheduled for tomorrow.\n\n📍 Location: Main Hall / Online\n⏰ Time: 05:00 PM\n\nPlease arrive on time. Looking forward to seeing you!\n\nBest regards,\nIEEE BSB Board",
  },
  {
    id: "workshop",
    name: "Workshop",
    icon: FileText,
    subject: "🚀 Upcoming Workshop: Hands-on Technical Session",
    body: "Hello Tech Enthusiasts!\n\nJoin us for an interactive workshop designed to boost your practical skills and industry knowledge.\n\nTopics covered:\n• Core Concepts & Architecture\n• Practical Hands-on Exercises\n• Q&A Session\n\nRegister now to reserve your spot!\n\nBest regards,\nIEEE Technical Committee",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    icon: Mail,
    subject: "📰 IEEE Beni Suef Monthly Newsletter — Latest Updates",
    body: "Welcome to this month's IEEE BSB Newsletter!\n\nHere is a quick recap of our latest achievements, member spotlights, and upcoming events for this month.\n\nThank you for being an active part of our community!\n\nWarm regards,\nIEEE Media & PR Committee",
  },
  {
    id: "certificate",
    name: "Certificate",
    icon: Bookmark,
    subject: "🎓 Your IEEE Event Participation Certificate",
    body: "Dear Participant,\n\nThank you for attending our recent event. We appreciate your active participation!\n\nYour certificate of appreciation/participation is attached to this email or ready for download.\n\nBest regards,\nIEEE BSB Organizing Team",
  },
  {
    id: "recruitment",
    name: "Recruitment",
    icon: Users,
    subject: "🚀 Join Our Team — IEEE BSB Recruitment [Season]",
    body: "Dear Student,\n\nIEEE Beni Suef Student Branch is now recruiting new members for the upcoming cycle!\n\nWe are looking for passionate, motivated, and dedicated students to join our committees:\n• Web Committee\n• UI/UX Committee\n• HR Committee\n• PR Committee\n• Robotics Committee\n• CS Committee\n\n📅 Application Deadline: [Insert Date]\n🔗 Apply here: [Insert Link]\n\nDon't miss this opportunity to grow, learn, and lead!\n\nBest regards,\nIEEE BSB High Board",
  },
];

interface EmailTemplatesCardProps {
  selectedTemplateId: string;
  onSelectTemplate: (tpl: typeof EMAIL_TEMPLATES[0]) => void;
}

export const EmailTemplatesCard: React.FC<EmailTemplatesCardProps> = ({
  selectedTemplateId,
  onSelectTemplate,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div>
        <h3 className="text-base font-bold text-[#000640]">Templates</h3>
        <p className="text-xs text-[#6C757D]">Start from a template</p>
      </div>

      <div className="space-y-2">
        {EMAIL_TEMPLATES.map((tpl) => {
          const IconComponent = tpl.icon;
          const isSelected = selectedTemplateId === tpl.id;
          return (
            <div
              key={tpl.id}
              onClick={() => {
                onSelectTemplate(tpl);
                toast.success(`Loaded template: ${tpl.name}`);
              }}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "bg-purple-50 border-[#5A10A5] text-[#5A10A5] shadow-2xs"
                  : "bg-gray-50 border-gray-100 text-gray-700 hover:border-purple-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected
                      ? "bg-[#5A10A5] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold">{tpl.name}</span>
              </div>
              {isSelected && <CheckCircle2 className="w-4 h-4 text-[#5A10A5]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
