import { FC } from "react";

const CreatePost: FC = () => {
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="new-post" className="form-group">
            Title
          </label>
          <input type="text" className="form-control" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
