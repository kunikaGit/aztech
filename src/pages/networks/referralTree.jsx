// import React, { useRef, useEffect, useState } from 'react';
// import Tree from 'react-d3-tree';

// const ReferralTree = ({ data }) => {
//   const treeContainer = useRef(null);
//   const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

//   useEffect(() => {
//     if (treeContainer.current) {
//       const { width, height } = treeContainer.current.getBoundingClientRect();
//       setDimensions({ width, height });
//     }
//   }, []);

//   // Map your API data to D3 tree format
//   const mapToTreeFormat = (node) => {
//     return {
//       name: `${node.name} ${node.surname}`,
//       attributes: {
//         Status: node.status=='active'?"Active":"Inactive",
//       },
//       children: node.referrals?.map(mapToTreeFormat) || [],
//     };
//   };

//   const treeData = mapToTreeFormat(data);

//   return (
//     <div style={{ width: '100%', height: '600px' }} ref={treeContainer}>
//       <Tree
//         data={treeData}
//         orientation="vertical"
//         translate={{ x: dimensions.width / 2, y: 50 }}
//         pathFunc="elbow"
//         collapsible
//         nodeSize={{ x: 200, y: 120 }}
//         styles={{
//           nodes: {
//             node: {
//               circle: { fill: '#6DA3F8' },
//               name: { fontSize: '16px', fill: '#333' },
//               attributes: { fontSize: '12px', fill: '#777' },
//             },
//             leafNode: {
//               circle: { fill: '#34C38F' },
//               name: { fontSize: '16px', fill: '#333' },
//               attributes: { fontSize: '12px', fill: '#777' },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default ReferralTree;


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

  const mapToTreeFormat = (node) => ({
    name: `${node.name} ${node.surname}`,
    attributes: {
      Status: node.status === 'active' ? 'Active' : 'Inactive',
    },
    children: node.referrals?.map(mapToTreeFormat) || [],
  });

  const treeData = mapToTreeFormat(data);

  // 👇 This replaces the circle with an image and preserves toggleNode
  const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => (
    <g onClick={toggleNode} style={{ cursor: 'pointer' }}>
      <image
        href="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
        x={-20}
        y={-20}
        width={40}
        height={40}
      />
      <text x={0} y={-30} textAnchor="middle" fontSize={14} fill="#333">
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes &&
        Object.entries(nodeDatum.attributes).map(([key, val], i) => (
          <text
            key={key}
            x={0}
            y={40 + i * 14}
            textAnchor="middle"
            fontSize={12}
            fill="#777"
          >
            {`${key}: ${val}`}
          </text>
        ))}
    </g>
  );

  return (
    <div style={{ width: '100%', height: '600px' }} ref={treeContainer}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: dimensions.width / 2, y: 50 }}
        pathFunc="elbow"
        collapsible
        nodeSize={{ x: 200, y: 120 }}
        renderCustomNodeElement={renderCustomNodeElement} // ✅ Custom rendering
      />
    </div>
  );
};

export default ReferralTree;
