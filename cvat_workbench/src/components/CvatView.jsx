function CvatView({ url }) {
  if (!url) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Please select a project to view.</p>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      style={{ width: "100%", height: "100%", border: "none" }}
      title="CVAT Annotation Interface"
    ></iframe>
  );
}

export default CvatView;
