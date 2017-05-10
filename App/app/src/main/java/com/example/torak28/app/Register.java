package com.example.torak28.app;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class Register extends AppCompatActivity {
    EditText login, haslo, email, imie, nazwisko;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        login = (EditText)findViewById(R.id.login);
        haslo = (EditText)findViewById(R.id.haslo);
        email = (EditText)findViewById(R.id.email);
        imie = (EditText)findViewById(R.id.imie);
        nazwisko = (EditText)findViewById(R.id.nazwisko);
    }

    public void OnReg(View view){
        String str_login = login.getText().toString();
        String str_haslo = haslo.getText().toString();
        String str_email = email.getText().toString();
        String str_imie = imie.getText().toString();
        String str_nazwisko = nazwisko.getText().toString();

        String type = "register";
        BackgroundWorker backgroundWorker = new BackgroundWorker(this);
        backgroundWorker.execute(type, str_login, str_haslo, str_email, str_imie, str_nazwisko);
    }

    public void Back(View view){
        //TODO
        super.onBackPressed();
    }
}
