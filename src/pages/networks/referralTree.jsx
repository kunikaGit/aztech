


import React, { useRef, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import './referralTree.scss';

const ReferralTree = ({ data }) => {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

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
      Email: node.email || 'N/A',
      JoinDate: node.joining_date ? new Date(node.joining_date).toLocaleDateString() : 'N/A',
      Referrals: node.referrals?.length || 0
    },
    children: node.referrals?.map(mapToTreeFormat) || [],
  });

  const treeData = mapToTreeFormat(data);

  const CustomNode = ({ nodeDatum, toggleNode }) => {
    const handleMouseEnter = (event) => {
      setHoveredNode(nodeDatum);
      setHoverPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
      setHoveredNode(null);
    };

    const getStatusColor = (status) => {
      return status === 'Active' ? '#28a745' : '#dc3545';
    };

    return (
      <g 
        onClick={toggleNode} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        {/* User Icon Circle */}
        <circle
          r="25"
          fill="#fff"
          stroke="#fff"
          strokeWidth="3"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
        />
        
        {/* User Icon */}
        <image
          href="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
          x="-15"
          y="-15"
          width="30"
          height="30"
        />
        
        {/* Status Indicator */}
        <circle
          r="8"
          fill={getStatusColor(nodeDatum.attributes?.Status)}
          cx="15"
          cy="-15"
          stroke="#fff"
          strokeWidth="2"
        />
        
        {/* Node Name */}
        <text 
          x="0" 
          y="45" 
          textAnchor="middle" 
          fontSize="14" 
          fontWeight="600"
          fill="#333"
          fontFamily="Poppins, sans-serif"
        >
          {nodeDatum.name}
        </text>
        
        {/* Referral Count */}
        <text 
          x="0" 
          y="60" 
          textAnchor="middle" 
          fontSize="12" 
          fill="#666"
          fontFamily="Poppins, sans-serif"
        >
          {nodeDatum.attributes?.Referrals || 0} referrals
        </text>
      </g>
    );
  };

  return (
    <div className="referral-tree-container" ref={treeContainer}>
      <div className="tree-wrapper">
        {treeData && (
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: dimensions.width / 2, y: 80 }}
            pathFunc="step"
            collapsible
            nodeSize={{ x: 300, y: 150 }}
            separation={{ siblings: 1.5, nonSiblings: 2 }}
            transitionDuration={800}
            renderCustomNodeElement={CustomNode}
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"
          />
        )}
      </div>
      
      {/* Hover Tooltip */}
      {hoveredNode && (
        <div 
          className="node-tooltip"
          style={{
            left: hoverPosition.x + 10,
            top: hoverPosition.y - 10,
          }}
        >
          <div className="tooltip-header">
            <h4>{hoveredNode.name}</h4>
            <span className={`status ${hoveredNode.attributes?.Status?.toLowerCase()}`}>
              {hoveredNode.attributes?.Status}
            </span>
          </div>
          <div className="tooltip-content">
            <div className="tooltip-item">
              <strong>Email:</strong> {hoveredNode.attributes?.Email}
            </div>
            <div className="tooltip-item">
              <strong>Join Date:</strong> {hoveredNode.attributes?.JoinDate}
            </div>
            <div className="tooltip-item">
              <strong>Referrals:</strong> {hoveredNode.attributes?.Referrals}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralTree;
