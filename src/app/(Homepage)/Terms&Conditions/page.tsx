
import React from 'react';
import type { Metadata, NextPage } from 'next';
import LoggingButton from '@/Components/Comp_Indv/LoggingButton';
export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "T&C",
};

const TermsAndConditionsPage: NextPage = () => {
  
  return (
    <>
  
      <div className="min-h-screen">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="px-4 py-6 sm:p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-medium mb-2">
                  1. Acceptance of Terms
                </h2>
                <p className="text-sm text-gray-400">
                  By accessing or using Seeklish&apos;s services, you agree to be bound
                  by these Terms and Conditions. If you disagree with any part of
                  the terms, you may not access the service.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-medium mb-2">2. Use of Service</h2>
                <p className="text-sm text-gray-400">
                  Our service is intended for personal and non-commercial use. You
                  must not use our service for any illegal or unauthorized
                  purpose. You agree to comply with all laws, rules, and
                  regulations applicable to your use of the service.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-medium mb-2">3. User Accounts</h2>
                <p className="text-sm text-gray-400">
                  By creating an account with us via a third-party provider, you
                  authorize us to collect and store your name, email, unique ID,
                  and profile image (which can be updated later). You are
                  responsible for all account activity and must keep your account
                  secure.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-medium mb-2">4. Content</h2>
                <p className="text-sm text-gray-400">
                  Our service allows you to post, link, store, share and otherwise
                  make available certain information, text, or other material. You
                  are responsible for the content that you post to the service,
                  including its legality, reliability, and appropriateness.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-medium mb-2">
                  5. Intellectual Property
                </h2>
                <p className="text-sm text-gray-400">
                  The service and its original content, features, and
                  functionality are and will remain the exclusive property of
                  Seeklish and its licensors. Our trademarks and trade dress may
                  not be used in connection with any product or service without
                  the prior written consent of Seeklish.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-medium mb-2">6. Termination</h2>
                <p className="text-sm text-gray-400">
                  We may terminate or suspend your account immediately, without
                  prior notice or liability, for any reason whatsoever, including
                  without limitation if you breach the Terms. Upon termination,
                  your right to use the service will immediately cease.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-medium mb-2">
                  7. Limitation of Liability
                </h2>
                <p className="text-sm text-gray-400">
                  In no event shall Seeklish, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from your
                  access to or use of or inability to access or use the service.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-medium mb-2">8. Governing Law</h2>
                <p className="text-sm text-gray-400">
                  These Terms shall be governed and construed in accordance with
                  the laws of Canada, without regard to its conflict of law
                  provisions.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-medium mb-2">9. Changes to Terms</h2>
                <p className="text-sm text-gray-400">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. What constitutes a material
                  change will be determined at our sole discretion. By continuing
                  to access or use our service after those revisions become
                  effective, you agree to be bound by the revised terms.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-medium mb-2">10. Account Deletion</h2>
                <p className="text-sm text-gray-400">
                  You can request account deletion through your profile page. Once
                  requested, your account will be deleted within 15 days. You will
                  receive a notification once your account has been permanently
                  deleted.
                </p>
              </section>
            </div>
            
          </div>
          <LoggingButton />
        </main>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;