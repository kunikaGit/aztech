import React, { useRef, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

const ReferralTree = ({ data }) => {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    if (treeContainer.current) {
      const { width, height } = treeContainer.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  // Map your API data to D3 tree format
  const mapToTreeFormat = (node) => {
    return {
      name: `${node.name} ${node.surname}`,
      attributes: {
        Status: node.status=='active'?"Active":"Inactive",
      },
      children: node.referrals?.map(mapToTreeFormat) || [],
    };
  };

  const treeData = mapToTreeFormat(data);

  return (
    <div style={{ width: '100%', height: '600px' }} ref={treeContainer}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: dimensions.width / 2, y: 50 }}
        pathFunc="elbow"
        collapsible
        nodeSize={{ x: 200, y: 120 }}
        styles={{
          nodes: {
            node: {
              circle: { fill: '#6DA3F8' },
              name: { fontSize: '16px', fill: '#333' },
              attributes: { fontSize: '12px', fill: '#777' },
            },
            leafNode: {
              circle: { fill: '#34C38F' },
              name: { fontSize: '16px', fill: '#333' },
              attributes: { fontSize: '12px', fill: '#777' },
            },
          },
        }}
      />
    </div>
  );
};

export default ReferralTree;
