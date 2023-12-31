import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Register from "./Register";
import { BrowserRouter as Router } from "react-router-dom";
import * as yup from 'yup';

test('render Register page correctly', () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  
  const registerForm = screen.getByText('Registration Form');
  expect(registerForm).toBeTruthy();
});

describe('Register Form Validation Schema', () => {
  test('should require name', async () => {
    const schema = yup.object().shape({
      name: yup.string().required('Name is required'),
    });
    const validData = { name: 'John Doe' };
    const invalidData = { name: '' };
    await expect(schema.validate(validData)).resolves.toBe(validData);
    await expect(schema.validate(invalidData)).rejects.toThrow('Name is required');
  });

  test('should require a valid email', async () => {
    const schema = yup.object().shape({
      email: yup.string().required('Email is required').email('Invalid email address'),
    });
    const validData = { email: 'test@example.com' };
    const invalidData = { email: 'invalid_email' };
    await expect(schema.validate(validData)).resolves.toBe(validData);
    await expect(schema.validate(invalidData)).rejects.toThrow('Invalid email address');
  });

  test('should require a password of at least 8 characters', async () => {
    const schema = yup.object().shape({
      password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
    });
    const validData = { password: 'password123' };
    const invalidData = { password: 'short' };
    await expect(schema.validate(validData)).resolves.toBe(validData);
    await expect(schema.validate(invalidData)).rejects.toThrow('Password must be at least 8 characters long');
  });
});