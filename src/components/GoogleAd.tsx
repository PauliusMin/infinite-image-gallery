import { useEffect } from 'react';

interface GoogleAdProps {
    addId: string
}

const GoogleAd = ({ addId }: GoogleAdProps) => {

  useEffect(() => {
    if (typeof window !== 'undefined' && window.googletag) {
        window.googletag.cmd.push(function() {
          // Define the ad slot dynamically
          window.googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], addId)?.addService(window.googletag.pubads());
          window.googletag.pubads().enableSingleRequest();
          window.googletag.enableServices();
        });
  
        window.googletag.cmd.push(function() {
          // Display the ad slot
          window.googletag.display(addId);
        });
      }
  }, [addId]);

  return (
    <div key={addId} id={addId} className="w-72 h-64 mx-auto my-4 border border-gray-300">
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.googletag.cmd.push(function() {
              window.googletag.display('${addId}');
            });
          `,
        }}
      />
    </div>
  );
};

export default GoogleAd;
