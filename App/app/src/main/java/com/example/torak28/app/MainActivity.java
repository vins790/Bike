package com.example.torak28.app;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    private EditText mUsername, mPassword;
    private Button mOkBtn, mCancleBtn;
    AlertDialog alertDialog;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if(isConnected()) {
            mUsername = (EditText) findViewById(R.id.text_user);
            mPassword = (EditText) findViewById(R.id.text_password);
        }else{
            alertDialog = new AlertDialog.Builder(this).create();
            alertDialog.setTitle("Hej!");
            alertDialog.setMessage("Niestety nie masz połączenia z Internetem, a Nasza aplikacja wymaga go do poprawnego użytkowania. Włącz i wróc do Nas jak najszybciej!");
            alertDialog.show();
            alertDialog.setOnCancelListener(new DialogInterface.OnCancelListener()
            {
                @Override
                public void onCancel(DialogInterface dialog)
                {
                    finish();
                }
            });
        }
    }

    public void login(View view) {
        String username = mUsername.getText().toString();
        String password = mPassword.getText().toString();

        String type = "login";
        BackgroundWorker backgroundWorker = new BackgroundWorker(this);
        backgroundWorker.execute(type, username, password);
    }

    public boolean isConnected(){
        boolean connected;
        ConnectivityManager connectivityManager = (ConnectivityManager)getSystemService(Context.CONNECTIVITY_SERVICE);
        if(connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE).getState() == NetworkInfo.State.CONNECTED ||
                connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI).getState() == NetworkInfo.State.CONNECTED) {
            //we are connected to a network
            connected = true;
        }
        else
            connected = false;
        return connected;
    }

    public void cancel(View view) {
        finish();
    }

    public void OpenReg(View view){
        startActivity(new Intent(this, Register.class));
    }
}
