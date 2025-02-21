export default function PostTable({ posts }) {
    return (<div className="overflow-x-auto">
    <table className="table table-xs table-pin-rows table-pin-cols">
      <thead>
        <tr>
          <th></th>
          <td>Título</td>
          <td>Fecha de publicación</td>
          <td>Contenido del artículo</td>
          <td>Alcance</td>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {posts.map((item, index) => (
          <tr key={index}>
            <th>{index + 1}</th>
            <td>{item.title}</td>
            <td>{item.publicationDate}</td>
            <td>{item.content.length > 50 ? item.content.substring(0, 50) + "..." : item.content}</td>
            <td>{item.reach}</td>
            {/* <th>{index + 1}</th> */}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <td>Título</td>
          <td>Fecha de publicación</td>
          <td>Contenido del artículo</td>
          <td>Alcance</td>
          <th></th>
        </tr>
      </tfoot>
    </table>
  </div>);
}