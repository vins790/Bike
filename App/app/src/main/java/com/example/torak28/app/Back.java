package com.example.torak28.app;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class Back extends AppCompatActivity {

    String UserName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_back);

        Bundle bundle = getIntent().getExtras();
        UserName = bundle.getString("UserName");
    }
}
