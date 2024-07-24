import { useRouter } from "next/router";
import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";

export default function Login() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useLogin();
  const router = useRouter();

  const onSubmit = () => {
    if (!name || !password) {
      alert("Please enter information");
    } else {
      login(name, password)
        .then(() => router.push("/moderate"))
        .catch((e) => alert(e));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>Login Form</h2>
        <label style={styles.label}>Email</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          placeholder="Username"
        />
        <label style={styles.label}>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          placeholder="Password"
          type="password"
        />
        <button
          onClick={onSubmit}
          style={{ ...styles.submitButton }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor)}
        >
          Login
        </button>
      </div>
    </div>
  );
}


const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f8' // Light background color
  } as React.CSSProperties,
  formBox: {
    width: '400px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow for depth
    backgroundColor: '#fff', // White background for the form
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  } as React.CSSProperties,
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center'
  } as React.CSSProperties,
  label: {
    fontSize: '14px',
    fontWeight: 'bold'
  } as React.CSSProperties,
  input: {
    height: '40px',
    padding: '0 12px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  } as React.CSSProperties,
  submitButton: {
    width: '100%',
    height: '40px',
    backgroundColor: '#007bff', // Primary button color
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  } as React.CSSProperties,
  submitButtonHover: {
    backgroundColor: '#0056b3' // Darker color on hover
  } as React.CSSProperties
};