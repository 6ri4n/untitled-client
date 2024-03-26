import SignupForm from "../components/Signup/SignupForm";

function SignupPage() {
  return (
    <main className="flex min-h-screen justify-center items-center">
      <section className="flex flex-col rounded-3xl p-12 m-6 border w-96 ">
        <div className="flex justify-center text-xl tracking-wide mb-10">
          Create your account
        </div>
        <div className="mt-5 mx-5">
          <SignupForm />
        </div>
      </section>
    </main>
  );
}

export default SignupPage;
