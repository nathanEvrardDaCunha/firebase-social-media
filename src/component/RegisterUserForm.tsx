const RegisterUserForm = () => {
  // IDEA: Go take a look at these articles to make a really beautiful yet ergonomic interface (https://www.uidesign.tips/ui-tips/social-login - https://www.uidesign.tips/blog/top-ui-ux-design-tips-for-better-forms)

  return (
    <form action="">
      <section>
        <label htmlFor="">Label 1</label>
        <p>Description of what is expected</p>
        <input type="text" name="" id="" placeholder="" required />
      </section>

      <section>
        <label htmlFor="">Label 2</label>
        <p>Description of what is expected</p>
        <input type="password" name="" id="" placeholder="" required />
      </section>

      <section>
        <input type="submit" value="Create your Account" />
        <a href="http://login">Go to login</a>
      </section>
    </form>
  );
};

export default RegisterUserForm;
