import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

function Flow() {
  return (
      <ReactFlow>
        <Background color="white" />
        <Controls />
      </ReactFlow>
  );
}


function FlowWrapper() {
  
  const documentStyle = {
    height: '100%',
    backgroundColor: 'black',
  };

  return (
    <div style={documentStyle}>
      <Flow/>
    </div>
  );
}

export default FlowWrapper;
