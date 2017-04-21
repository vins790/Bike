package com.example.torak28.app;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    private EditText mUsername, mPassword;
    private Button mOkBtn, mCancleBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mUsername = (EditText)findViewById(R.id.text_user);
        mPassword = (EditText)findViewById(R.id.text_password);
    }

    public void login(View view) {
        //TODO logowanie
        String username = mUsername.getText().toString();
        String password = mPassword.getText().toString();
    }

    public void cancel(View view) {
        finish();
    }

    public void create_account(View view) {
        //TODO tworzenie konta
    }

    public void recoll_password(View view) {
        //TODO przypominanie hasła
    }
}
