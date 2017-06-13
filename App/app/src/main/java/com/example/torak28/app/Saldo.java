package com.example.torak28.app;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;

public class Saldo extends AppCompatActivity {

    private EditText Liczba;
    private String UserName, output;
    AlertDialog alertDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_saldo);

        Bundle bundle = getIntent().getExtras();
        UserName = bundle.getString("UserName");

        Liczba = (EditText) findViewById(R.id.editText2);

    }

    public void DodajSrodki(View view) {
        String WpisanaLiczba = Liczba.getText().toString();

        if (Liczba.getText().toString().equals(""))
        {
            output = "Pozostawiłeś pole puste!";
            alertDialog = new AlertDialog.Builder(this).create();
            alertDialog.setTitle("Status");
            alertDialog.setMessage(output);
            alertDialog.show();
        }else {

            try {
                String type = "DodajSaldo";
                BackgroundWorker backgroundWorker = new BackgroundWorker(this);
                output = backgroundWorker.execute(type, UserName, WpisanaLiczba).get();
                alertDialog = new AlertDialog.Builder(this).create();
                alertDialog.setTitle("Status");
                alertDialog.setMessage(output);
                alertDialog.show();
                alertDialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
                    @Override
                    public void onCancel(DialogInterface dialog) {
                        finish();
                    }
                });
            } catch (Exception e) {

            }
        }
    }
}
