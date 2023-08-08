import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { bundlrInstance } from '../Helper/bundlrInstance';

const ContentDisplay = ({ transactionId }) => {
  const { account } = useMoralis();
  const [contentUrl, setContentUrl] = useState('');

  useEffect(() => {
    async function fetchContent() {
      try {
        const bundlr = await bundlrInstance();
        const { data } = await bundlr.getContent(transactionId);
        setContentUrl(data.url);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }
    
    fetchContent();
  }, [transactionId]);

  return (
    <div>
    {contentUrl ? (
      <video controls src={contentUrl} />
    ) : (
      <p>Error loading content.</p>
    )}
  </div>
  );
};

export default ContentDisplay;
