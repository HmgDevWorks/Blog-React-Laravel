const PostDetailsPC = ({ blog }) => {
    return (
        <div className="detallesBlogPC">
            <h3>{blog.titulo}</h3>
            <div className="tag">{blog.tag}</div>
            <div className="blogContImg">
                <div className="imagenBlog">
                    <img src={blog.image} alt="" />
                </div>
                <div className="blogContenido">
                    {blog.contenido}
                </div>
            </div>
            <div className="autorNombre">
                {blog.autor}
            </div>
        </div>
    );
}
export default PostDetailsPC;