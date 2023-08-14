import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import styled from "styled-components";
import { FaBuilding, FaBalanceScale, FaChevronDown } from "react-icons/fa";
import orgData from "./org.json";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const OrganizationCard = styled.div`
  background-color: ${(props) => (props.isActive ? "#ddffd2" : "#ffffff")};
  border-radius: 16px;
  display: inline-block;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Avatar = styled.div`
  background-color: #ececf4;
  border-radius: 50%;
  width: 20px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
`;

const OrganizationTitle = styled.h2`
  margin: 2px;
  font-size: 7px;
  color: #333;
`;

function Organization({ org, onCollapse, collapsed }) {
  const isActive = false;
  return (
    <OrganizationCard isActive={isActive}>
      <Avatar>
        <FaBuilding color="primary" />
      </Avatar>
      <OrganizationTitle>{org.tradingName}</OrganizationTitle>
      <FaChevronDown onClick={onCollapse} style={{ cursor: "pointer" }} />
    </OrganizationCard>
  );
}

function Account({ a }) {
  return (
    <div>
      <FaBalanceScale color="secondary" />
      <p>{a.name}</p>
    </div>
  );
}

function Node({ o, parent }) {
  const [collapsed, setCollapsed] = React.useState(o.collapsed || false);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  React.useEffect(() => {
    o.collapsed = collapsed;
  }, [collapsed, o]);

  const T = parent ? TreeNode : Tree;

  return (
    <T label={<Organization org={o} onCollapse={handleCollapse} />}>
      {collapsed ? null : (
        <>
          {_.map(o.account, (a) => (
            <TreeNode label={<Account a={a} />} />
          ))}
          {_.map(o.organizationChildRelationship, (c) => (
            <Node o={c} parent={o} key={c.tradingName} />
          ))}
        </>
      )}
    </T>
  );
}

function App() {
  return (
    <CenteredContainer>
      <Tree>
        <Node o={orgData} />
      </Tree>
    </CenteredContainer>
  );
}

export default App;
