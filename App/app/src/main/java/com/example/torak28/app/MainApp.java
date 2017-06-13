package com.example.torak28.app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class MainApp extends AppCompatActivity {

    private String UserName;
    private String output;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_app);

        Bundle bundle = getIntent().getExtras();
        UserName = bundle.getString("UserName");

        String type = "saldo";
        BackgroundWorker BackgroundWorker = new BackgroundWorker(this);
        try {
            output = BackgroundWorker.execute(type, UserName).get();
            String display = "Saldo: " + output;
            TextView Baner = (TextView) findViewById(R.id.Saldo);
            Baner.setText(display);
        }catch(Exception e){
            //nic
        }
    }

    @Override
    public void onResume(){
        super.onResume();
        String type = "saldo";
        BackgroundWorker BackgroundWorker = new BackgroundWorker(this);
        try {
            output = BackgroundWorker.execute(type, UserName).get();
            String display = "Saldo: " + output;
            TextView Baner = (TextView) findViewById(R.id.Saldo);
            Baner.setText(display);
        }catch(Exception e){
            //nic
        }
    }

    public void Rent(View view){
        Intent intent = new Intent(this, Rent.class);
        intent.putExtra("UserName", UserName);
        intent.putExtra("Saldo", output);
        startActivity(intent);
    }

    public void Back(View view){
        Intent intent = new Intent(this, Back.class);
        intent.putExtra("UserName", UserName);
        intent.putExtra("Saldo", output);
        startActivity(intent);
    }

    public void SaldoZarzadz(View view){
        Intent intent = new Intent(this, Saldo.class);
        intent.putExtra("UserName", UserName);
        startActivity(intent);
    }
}
