import { Container, Card } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container fluid className="mt-4">
      <Card
        className="shadow"
        style={{
          height: "85vh"
        }}
      >
        <iframe
          title="KPI reportes dinamicos Grupales"
          src="https://app.powerbi.com/view?r=eyJrIjoiMmRiZjAwNzctNWJlZC00NTVmLTg1YjUtMDJjN2M3MzUwY2ZjIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
          width="100%"
          height="100%"
          style={{
            border: "none"
          }}
          allowFullScreen
        />
      </Card>
    </Container>
  );
};

export default Dashboard;