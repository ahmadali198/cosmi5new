import React, { Component } from 'react';
import API from '../api/axios';

export default class ListPosts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    API
      .get(`http://localhost:8080/api/posts`)
      .then((response) => {
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  handleDelete = (id) => {
    const token = localStorage.getItem('token');
    API
      .delete(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        this.setState({
          posts: this.state.posts.filter((post) => post._id !== id),
        });
      })
      .catch((error) => {
        console.error('Delete error:', error);
      });
  };

  render() {
    return (
      <div className="container py-5">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-center text-primary fw-bold mb-4">📚 Blog Posts</h2>

          {this.state.posts.length === 0 ? (
            <p className="text-center text-muted">No posts available.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle table-bordered border-light-subtle">
                <thead className="table-primary">
                  <tr className="text-center">
                    <th>📝 Title</th>
                    <th>📄 Content</th>
                    <th>⚙️ Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.posts.map((post) => (
                    <tr key={post._id}>
                      <td className="fw-semibold">{post.title}</td>
                      <td>{post.content}</td>
                      <td className="text-center">
                        <a
                          href={`/update/${post._id}`}
                          className="btn btn-sm btn-outline-primary me-2"
                          title="Edit Post"
                        >
                          ✏️ Edit
                        </a>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => this.handleDelete(post._id)}
                          title="Delete Post"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}
