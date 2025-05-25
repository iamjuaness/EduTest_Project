package com.bases2.edustest.dao;

import com.bases2.edustest.entity.Users;

import java.util.Map;

public interface UsersDao {

    Map<String, Object> getRecordById(String tableName, int id);

    public Users login(String userEmail, String password);
}
